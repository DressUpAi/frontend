export default function getCroppedImg(imageSrc, pixelCrop, outputWidth = 384, outputHeight = 512) {
    const image = new Image();
    return new Promise((resolve, reject) => {
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        canvas.width = outputWidth;
        canvas.height = outputHeight;
  
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          outputWidth,
          outputHeight
        );
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          const fileUrl = window.URL.createObjectURL(blob);
          resolve(fileUrl);
        }, 'image/jpeg');
      };
      image.onerror = (e) => reject(e);
    });
  }
  
