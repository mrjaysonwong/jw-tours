import connectMongo from '@/lib/connection';
import User from '@/model/userModel';
import Token from '@/model/tokenModel';
import cloudinary from '@/utils/config/cloudinary';
import {
  getErrorMessage,
  getValidationError,
} from '@/utils/helper/errorHandler';
import {
  personalDetailsSchema,
  contactInfoSchema,
} from '@/lib/validation/yup/personalDetailsSchema';
import { auth } from '@/auth';
import {
  createToken,
  updateToken,
} from '@/utils/helper/token-handlers/addEmailToken';
import { formattedDate } from '@/utils/helper/formats/formattedDate';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/src/template/EmailTemplate';
import { sendEmail } from '@/utils/config/sendEmail';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const opts = {
  points: 1,
  duration: 60, // 60 secs per request
};

const rateLimiter = new RateLimiterMemory(opts);

export async function changeProfilePhoto(userId, Request) {
  try {
    const body = await Request.json();
    const { croppedImage } = body;

    if (!body) {
      throw {
        message: 'Invalid or missing body request croppedImage.',
        status: 400,
      };
    }

    // await connectMongo();

    const userExists = await User.findById(userId);

    if (!userExists) {
      throw { message: 'User Not Found', status: 401 };
    }

    const imageId = userExists.image?.public_id;

    const result = await cloudinary.uploader.upload(croppedImage, {
      folder: imageId ? '' : 'jwtours/avatars',
      public_id: imageId,
      allowed_formats: ['jpg'],
      format: 'jpg',
    });

    userExists.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await userExists.save();
  } catch (error) {
    console.error(error);
    throw { message: error.message, status: error.status };
  }
}

export async function deleteProfilePhoto(userId) {
  try {
    // await connectMongo();

    const userExists = await User.findById(userId);

    if (!userExists) {
      throw { message: 'User Not Found', status: 401 };
    }

    const imageId = userExists?.image?.public_id;

    if (imageId) {
      await cloudinary.uploader.destroy(imageId);
    }

    userExists.image = {
      public_id: null,
      url: null,
    };

    await userExists.save();
  } catch (error) {
    console.error(error);
    throw { message: error.message, status: error.status };
  }
}

export async function updatePersonalDetails(userId, Request) {
  try {
    const body = await Request.json();

    await personalDetailsSchema.validate({ ...body }, { abortEarly: false });

    const userExists = await User.findById(userId);

    if (!userExists) {
      throw { message: 'User Not Found', status: 401 };
    }

    await User.findByIdAndUpdate(userId, body, {
      new: true,
    });
  } catch (error) {
    getValidationError(error);

    console.error(error);
    throw { message: error.message, status: error.status };
  }
}

export async function addEmailAddress(userId, Request) {
  try {
    const body = await Request.json();
    const email = body.email;
    const session = await auth();

    await contactInfoSchema.validate({ ...body }, { abortEarly: false });

    if (userId !== session?.user?.id) {
      throw {
        message:
          "Unauthorized: You do not have permission to update another user's details",
        status: 403,
      };
    }

    const emailTaken = await User.findOne({
      'email.email': email,
    });

    if (emailTaken) {
      throw { message: 'Email already taken.', status: 409 };
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
      throw { message: 'User Not Found', status: 404 };
    }

    await rateLimiter.consume(email, 1);

    let otp;
    let epochTimeExpires;

    const foundUserToken = await Token.findOne({ userId });

    if (!foundUserToken) {
      const { genOTP, genExpires } = await createToken(userId, email);

      otp = genOTP;
      epochTimeExpires = genExpires;
    } else {
      const { genOTP, genExpires } = await updateToken(
        foundUserToken,
        userId,
        email
      );

      otp = genOTP;
      epochTimeExpires = genExpires;
    }

    const formattedDateString = await formattedDate(epochTimeExpires);

    const firstName = userExists.firstName;
    const mode = 'email-otp';

    const emailHtml = render(
      <EmailTemplate
        otp={otp}
        firstName={firstName}
        formattedDateString={formattedDateString}
        mode={mode}
      />
    );

    await sendEmail({
      to: email,
      subject: 'JWtours Email Verification',
      html: emailHtml,
    });
  } catch (error) {
    const rateLimited = error?.remainingPoints === 0;
    const timeLeft = Math.floor(error?.msBeforeNext / 1000);

    if (rateLimited) {
      throw {
        message: `One request per minute. Try again in ${timeLeft} seconds.`,
        status: 429,
      };
    } else {
      getValidationError(error);

      console.error(error);
      throw { message: error.message, status: error.status };
    }
  }
}

export async function updateEmailAddress() {
  
}
