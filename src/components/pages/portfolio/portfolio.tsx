import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import portfolioStore from '../../../store/portfolioStore';
import useConfirm from '../../../hooks/useConfirm';
import ShowMessage from '../../popupMessages/showMessage';
import PortfolioGrid from './portfolioGrid';
import EditPanel from '../../widgets/EditPanel';
import PhotosGalery from './photosGalary';


export interface Event<T = EventTarget> {
  target: T;
}


interface IPortfolioProps {
  // error: string;
  // success: boolean;
}

const Portfolio: React.FC<IPortfolioProps> = observer(() => {


  const {
    sortImages,
    imageListLength,
    uploadImages,
    deleteAllImages,
    portfolioError,
    portfolioSuccess
  } = portfolioStore;
  
  const [images, setImages] = useState<any>(null);
  const [imagesLength, setImagesLength] = useState<number>(0);
  const [zoomImageIndex, setZoomImageIndex] = useState<number>(0);



  useEffect(() => {
    images && showUploadConfirm();
  }, [images])

  const { confirm } = useConfirm();
  const showConfirm = useCallback(async () => {
    const isConfirmed = await confirm('Удалить все записи?');
    if (isConfirmed) {
      deleteAllImages();
      setImages(null);
    }
  }, [])


  
  const showUploadConfirm = useCallback(async () => {
    const isConfirmed = await confirm(`Добавить выбранные изображения: ${imagesLength}?`);
    if (isConfirmed) {
      uploadImages(images);
      setImages(null);
    }
  }, [images])


  const changeHandler = useCallback((e: Event<HTMLInputElement>) => {
    const data = new FormData();
    const files = { ...e.target.files };
    files && setImagesLength(Object.keys(files).length);
    e.target.files = null;
    e.target.value = '';
    for (const key in files) {
      // 'image_path' - эта метка установлена на сервере
      data.append(`image_path`, files[key]);
    }
    setImages(data);
  }, [])

  const addHandler = useCallback(() => {
    // uploadImages(images);
    // setImages(null);
  }, [])

  const removeAllHandler = useCallback(() => {
    showConfirm();
  }, [])

  const zoomHandler = useCallback((index: number) => {
    setZoomImageIndex(index + 1);
  }, [])

  return (
    <>
      <ShowMessage
        error={portfolioError}
        success={portfolioSuccess}
      />
      <PortfolioGrid
        sortImages={sortImages}
        imageListLength={imageListLength}
        zoomHandler={zoomHandler}
      />
      
      <PhotosGalery
        sortImages={sortImages}
        zoomImageIndex={zoomImageIndex}
        setZoomImageIndex={setZoomImageIndex}
      />

      <EditPanel
        changeHandler={changeHandler}
        addHandler={null}
        removeAllHandler={removeAllHandler}
      />
    </>
  )
})


export default Portfolio;