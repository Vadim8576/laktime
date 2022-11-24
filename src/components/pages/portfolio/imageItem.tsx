import React, { useState, useCallback, FC } from 'react';
import { ImageListItem, Grow } from '@mui/material';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useUrlsFormat } from '../../../hooks/useUrlsFormat';
import portfolioStore from '../../../store/portfolioStore';
import useConfirm from '../../../hooks/useConfirm';
import ImageHoverArea from './imageHoverArea';
import DeleteButton from '../../ui/deleteButton';
import ImageSpiner from '../../ui/imageSpiner';



interface IImgProps {
  transparency: boolean;
}

const Img = styled.img<IImgProps>`
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


interface IImageItemProps {
  imagePath: string;
  id: string;
  zoomHandler: (index: number) => void;
  imageIndex: number;
}


const ImageItem: FC<IImageItemProps> = observer(({ ...props }) => {

  const { deleteImage } = portfolioStore;
  const { imagePath, id, zoomHandler, imageIndex } = props;
  const url = useUrlsFormat(imagePath) as string;
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const { confirm } = useConfirm();

  const onLoad = () => {
    setImgIsLoading(false);
  }

  const showConfirm = async () => {
    const isConfirmed = await confirm('Удалить эту запись?');
    if (isConfirmed) deleteImage(id);
  }

  const deleteButtonClickHandler = () => {
    showConfirm();
  }

  const mouseEnterHandler = () => {
    setHover(true);
  }

  const mouseLeaveHandler = () => {
    setHover(false);
  }

  const onClickHandler = () => {
    zoomHandler(imageIndex);
  }

  return (
    <ImageListItem>
      <ImageSpiner imgIsLoading={imgIsLoading} />
      <Img
        src={url}
        alt='Маникюр'
        loading='lazy'
        onLoad={onLoad}
        transparency={imgIsLoading}
        onMouseEnter={mouseEnterHandler}
        onMouseOut={mouseLeaveHandler}
        onClick={onClickHandler}
      />
      <ImageHoverArea
        imgIsLoading={imgIsLoading}
        hover={hover}
      />
      <DeleteButton
        deleteButtonClickHandler={deleteButtonClickHandler}
      />
    </ImageListItem>
  )
})

export default ImageItem;




