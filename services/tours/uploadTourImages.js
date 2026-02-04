import cloudinary from '@/lib/cloudinary';
import Tour from '@/models/tourModel';

export async function uploadTourImages(base64Images, tourId) {
  try {
    // Upload images to Cloudinary
    const uploadPromises = base64Images.map(async (image) => {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: `jwtours/tour-gallery/${tourId}`,
        allowed_formats: ['jpg', 'png'],
      });

      return {
        public_id: uploadRes.public_id,
        url: uploadRes.secure_url,
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return uploadedImages;
  } catch (error) {
    throw error;
  }
}

export async function updateTourImages(
  base64Images,
  tourId,
  tourExists,
  dataImages
) {
  try {
    const customTourId = tourExists.tourId;
    const oldImages = tourExists.images;

    // Step 1: Extract the new image URLs (excluding base64 data)
    const newImageUrls = dataImages.filter(
      (img) => !img.startsWith('data:image/')
    );

    // Step 2: Identify removed images
    const removedImages = oldImages.filter(
      (img) => !newImageUrls.includes(img.url)
    );

    // Step 3: Delete removed images from Cloudinary
    if (removedImages.length > 0) {
      const deletePromises = removedImages.map((img) =>
        cloudinary.uploader.destroy(img.public_id)
      );
      await Promise.all(deletePromises);
    }

    // Step 4: Upload new base64 images to Cloudinary (if any)
    const uploadedImages =
      base64Images.length > 0
        ? await uploadTourImages(base64Images, customTourId)
        : [];

    // Step 5: Retain existing images that were not removed
    const retainedImages = oldImages.filter((img) =>
      newImageUrls.includes(img.url)
    );

    // Step 6: Final image array (retained + newly uploaded)
    const finalImageArray = [...retainedImages, ...uploadedImages];

    await Tour.updateOne(
      { _id: tourId },
      { $set: { images: finalImageArray } }
    );
  } catch (error) {
    throw error;
  }
}
