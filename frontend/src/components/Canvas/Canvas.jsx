import React, { useEffect, useRef } from 'react';

const Canvas = ({ src, className, alt = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    const image = new Image();

    image.src = src;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
    };

  }, [src]); 
  return <canvas ref={ref} className={className} aria-label={alt} />;
};

export default Canvas;
