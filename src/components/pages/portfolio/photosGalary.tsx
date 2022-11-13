import React, { FC, useState, useCallback, useEffect } from 'react';
import FsLightbox from 'fslightbox-react';
import { observer } from 'mobx-react-lite';
import { IPortfolioList } from '../../../store/storeTypes';
import { useUrlsFormat } from '../../../hooks/useUrlsFormat';

const baseUrl = 'http://localhost:4000/images/';

interface IPhotosGaleryProps {
  sortImages: IPortfolioList[];
  zoomImageIndex: number;
  setZoomImageIndex: (index: number) => void;
}

const PhotosGalery: FC<IPhotosGaleryProps> = observer(({ ...props }) => {

  const { sortImages, setZoomImageIndex, zoomImageIndex } = props;
  const urls = useUrlsFormat(sortImages) as string[];

  const [toggler, setToggler] = useState(false);
  useEffect(() => {
    (zoomImageIndex > 0) ? setToggler(true) : setToggler(false)
  }, [zoomImageIndex])

  const onCloseHandler = useCallback(() => {
    setZoomImageIndex(0)
  }, [zoomImageIndex])

  if (zoomImageIndex === 0) return null

  return (
    <FsLightbox
      toggler={toggler}
      sources={urls}
      slide={zoomImageIndex}
      onClose={onCloseHandler}
    />
  );
})

export default PhotosGalery;



