'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function SafeImage({ src, fallbackSrc = '/images/suez_hero_delivery.png', alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = React.useState<string>(src);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || 'Delivery Suez Image'}
      referrerPolicy="no-referrer"
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
