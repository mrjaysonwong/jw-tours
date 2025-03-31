import cloudinary from '@/services/cloudinary';

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
