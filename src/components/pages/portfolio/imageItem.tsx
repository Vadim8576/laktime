import React, { useState, useCallback, useEffect } from 'react';
import { Skeleton, ImageListItem } from '@mui/material';

interface IImageToRenderProps {
  imagePath: string;
}

const ImageItem: React.FC<IImageToRenderProps> = ({ imagePath }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, [])

  
  return (
    <>
      {isLoading &&
        <Skeleton variant="rectangular" width={248} height={180} />
      }
      <ImageListItem>
        <img
          src={`http://localhost:4000/images/${imagePath}?w=248&fit=crop&auto=format`}
          srcSet={`http://localhost:4000/images/${imagePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt='Маникюр'
          loading='lazy'
          onLoad={handleLoad}
        />
      </ImageListItem>
    </>
  )
}

export default ImageItem;