import connectMongo from '@/lib/connection';
import User from '@/model/userModel';
import cloudinary from '@/utils/config/cloudinary';

export async function changeProfilePhoto(userId, Request, Response) {
  const body = await Request.json();
  const { croppedImage } = body;

  if (!body) {
    return Response.json(
      { message: 'Invalid or missing request body croppedImage.' },
      { status: 400 }
    );
  }

  await connectMongo();

  const userExists = await User.findById(userId);

  if (!userExists) {
    return Response.json({ message: 'User Not Found' }, { status: 401 });
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
}

export async function deleteProfilePhoto(userId, Response) {
  await connectMongo();

  const userExists = await User.findById(userId);

  if (!userExists) {
    return Response.json({ message: 'User Not Found' }, { status: 401 });
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
}
