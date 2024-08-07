export function getCroppedImg(base64Image, croppedAreaPixels) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64Image;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const { x, y, width, height } = croppedAreaPixels;

      canvas.width = width;
      canvas.height = height;

      // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
      ctx.drawImage(
        image,
        x, // tilesheet (where you want to place the grab)
        y,
        width, // how big of a grab
        height,
        0, // where you want the crop to be placed
        0,
        width, // size of placement of what was grabbed
        height
      );

      const croppedImage = canvas.toDataURL('image/jpg');

      resolve(croppedImage);
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
}
