import React, { useState, useCallback, FC } from 'react';
import { ImageListItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useSrc } from '../../../hooks/useSrc';
import portfolioStore from '../../../store/portfolioStore';
import useConfirm from '../../../hooks/useConfirm';
import ImageHoverArea from './imageHoverArea';
import DeleteButton from '../../ui/deleteButton';
import ImageSpiner from '../../ui/imageSpiner';



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
  &:hover {
    cursor: pointer;
  }
`


interface IImageToRenderProps {
  imagePath: string;
  id: string;
}


const ImageItem: FC<IImageToRenderProps> = observer(({ ...props }) => {

  const { deleteImage } = portfolioStore;
  const { imagePath, id } = props;
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const url = useSrc(imagePath);
  const { confirm } = useConfirm();

  const onLoad = useCallback(() => {
    console.log('картинка загружена')
    setImgIsLoading(false);
  }, [])

  const showConfirm = async () => {
    const isConfirmed = await confirm('Удалить эту запись?');
    if (isConfirmed) deleteImage(id);
  }

  const deleteButtonClickHandler = useCallback(() => {
    showConfirm();
  }, [id])

  const mouseEnterHandler = useCallback(() => {
    setHover(true);
  }, [])

  const mouseLeaveHandler = useCallback(() => {
    setHover(false);
  }, [])

 
  return (
    <ImageListItem>  
      <Img
        src={url.src}
        srcSet={url.srcSet}
        alt='Маникюр'
        loading='lazy'
        onLoad={onLoad}
        transparency={imgIsLoading}
        onMouseMove={mouseEnterHandler}
        onMouseOut={mouseLeaveHandler}
      />
      <ImageSpiner imgIsLoading={imgIsLoading} />
      <ImageHoverArea imgIsLoading={imgIsLoading} hover={hover} />
      <DeleteButton
        deleteButtonClickHandler={deleteButtonClickHandler}
      />
    </ImageListItem>
  )
})

export default ImageItem;




