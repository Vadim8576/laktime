import React, { useState, useEffect, useCallback } from 'react';
import { ImageListItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import LoadingIcon from '../../ui/loadingIcon';
import { useSrc } from '../../../hooks/useSrc';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteButton from '../../ui/deleteButton';
import portfolioStore from '../../../store/portfolioStore';
import useConfirm from '../../../hooks/useConfirm';


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


const ImageItem: React.FC<IImageToRenderProps> = observer(({ ...props }) => {

  const { deleteImage } = portfolioStore;
  const { imagePath, id } = props;
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true);
  const url = useSrc(imagePath);
  const { confirm } = useConfirm();

  const onLoad = useCallback(() => {
    console.log('картинка загружена')
    setImgIsLoading(false);
  }, [])

  const showConfirm = async () => {
    const isConfirmed = await confirm('Удалить эту запись?');
    if(isConfirmed) deleteImage(id); 
  }

  const handlerDeleteButtonClick = useCallback(() => {
    showConfirm();
  }, [id])

  return (
    <ImageListItem>
      {imgIsLoading && <LoadingIcon />}
      <Img
        src={url.src}
        srcSet={url.srcSet}
        alt='Маникюр'
        loading='lazy'
        onLoad={onLoad}
        transparency={imgIsLoading}
      />
      {!imgIsLoading && <DeleteButton handlerDeleteButtonClick={handlerDeleteButtonClick} />}
     
    </ImageListItem>
  )
})

export default ImageItem;



