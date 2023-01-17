import React, { useRef, useState, useEffect } from 'react';
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
import { useObserver } from '../../../hooks/useObserver';



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
  imageName: string;
  id: number;
  zoomHandler: (index: number) => void;
  imageIndex: number;
  idsOfSelectedItems: number[];
  setIdsOfSelectedItems: (arr: any) => void;
}


const PortfolioItem = observer(({ ...props }: IImageItemProps) => {

  const { deleteImage } = portfolioStore;
  const { imageName, id, zoomHandler, imageIndex, setIdsOfSelectedItems, idsOfSelectedItems } = props;

  const url = useUrlsFormat(imageName) as string;

  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const { setNewIds, checkboxChecked } = useCheckBox();

  const checked = checkboxChecked(idsOfSelectedItems, +id);
  const { confirm } = useConfirm();


  const [loadingComplite, setLoadingComplite] = useState<boolean>(false);
  const [imageInView, setImageInView] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageEntry = useObserver(imageRef, { rootMargin: '0px' });

  useEffect(() => {
    if (!imageEntry) return;
    setImageInView(true);
  }, [imageEntry])




  const onLoadImage = () => {
    setLoadingComplite(true);
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
      <ImageSpiner imgIsLoading={!loadingComplite} />
      <div ref={imageRef}>
        {imageInView &&
          <Img
            src={url}
            alt='Маникюр'
            // loading='lazy'
            onLoad={onLoadImage}
            transparency={!loadingComplite}
            onMouseEnter={mouseEnterHandler}
            onMouseOut={mouseLeaveHandler}
            onClick={onClickHandler}
          />
        }

      </div>

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




