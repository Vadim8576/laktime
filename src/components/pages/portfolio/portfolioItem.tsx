import React, { useState } from 'react';
import { ImageListItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useUrlsFormat } from '../../../hooks/useUrlsFormat';
import portfolioStore from '../../../store/portfolioStore';
import useConfirm from '../../../hooks/useConfirm';
import ImageHoverArea from './imageHoverArea';
import PortfolioItemActionsPanel from './portfolioItemActionsPanel';
import ImageSpiner from '../../ui/imageSpiner';
import { useCheckBox } from '../../../hooks/useCheckBox';



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
  id: number;
  zoomHandler: (index: number) => void;
  imageIndex: number;
  idsOfSelectedItems: number[];
  setIdsOfSelectedItems: (arr: any) => void;
}


const PortfolioItem = observer(({ ...props }: IImageItemProps) => {

  const { deleteImage } = portfolioStore;
  const { imagePath, id, zoomHandler, imageIndex, setIdsOfSelectedItems, idsOfSelectedItems } = props;
  const url = useUrlsFormat(imagePath) as string;
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const { setNewIds, checkboxChecked } = useCheckBox();
  const checked = checkboxChecked(idsOfSelectedItems, +id);
  const { confirm } = useConfirm();

  const onLoad = () => {
    setImgIsLoading(false);
  }

  const showConfirm = async () => {
    const isConfirmed = await confirm('Удаление записи!');
    if (isConfirmed) {
      setIdsOfSelectedItems([]);
      deleteImage(id);
    }
  }

  const panelActions = {
    deleteButtonOnClick: () => showConfirm(),
    checkboxOnChange: () => { 
      setIdsOfSelectedItems((ids: number[]) => setNewIds(ids, id));
    }
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
      <PortfolioItemActionsPanel
        panelActions={panelActions}
        checked={checked}
      />
    </ImageListItem>
  )
})

export default PortfolioItem;




