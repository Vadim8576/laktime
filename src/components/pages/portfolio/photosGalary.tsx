import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import FsLightbox from 'fslightbox-react';
import { observer } from 'mobx-react-lite';
import { IPortfolioList } from '../../../store/storeTypes';

const baseUrl = 'http://localhost:4000/images/';

interface IPhotosGaleryProps {
  sortImages: IPortfolioList[];
  zoomImageIndex: number;
  setZoomImageIndex: (index: number) => void;
}

const PhotosGalery: FC<IPhotosGaleryProps> = observer(({ ...props }) => {

  const { sortImages, setZoomImageIndex, zoomImageIndex } = props;
  const urls = sortImages.map(image => `${baseUrl}${image.image_path}?w=248&fit=crop&auto=format`);
  
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



