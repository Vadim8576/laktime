import React, { useState, useEffect, useCallback } from 'react';
import { ImageListItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import LoadingIcon from '../../ui/loadingIcon';
import { useSrc } from '../../../hooks/useSrc';


interface ImgProps {
  transparency: boolean;
}

const Img = styled.img<ImgProps>`
  opacity: ${(props) => (props.transparency ? 0 : 1)};
  transition: 1s all;
  object-fit: cover;
  width: 100%;
  height: auto;
  flex-grow: 1;
`


interface IImageToRenderProps {
  imagePath: string;
}

const ImageItem: React.FC<IImageToRenderProps> = observer(({ imagePath }) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const url = useSrc(imagePath);

  const onLoad = useCallback(() => {
    console.log('картинка загружена')
    setIsLoading(false);
  }, [])


  return (
    <ImageListItem>

      { isLoading && <LoadingIcon /> }

      <Img
        src={url.src}
        srcSet={url.srcSet}
        alt='Маникюр'
        loading='lazy'
        onLoad={onLoad}
        transparency={isLoading}
      />

    </ImageListItem>
  )
})

export default ImageItem;