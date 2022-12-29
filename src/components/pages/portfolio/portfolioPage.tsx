import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import portfolioStore from '../../../store/portfolioStore';
import useConfirm from '../../../hooks/useConfirm';
import ShowMessage from '../../popupMessages/showMessage';
import PortfolioGrid from './portfolioGrid';
import EditPanel from '../../widgets/EditPanel';
import PhotosGalery from './photosGalary';
import { useSelectedItems } from '../../../hooks/useSelectedItems';
import { Event } from '../../../types/types';



const Portfolio = observer(() => {
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
  const [idsOfSelectedItems, setIdsOfSelectedItems] = useState<number[]>([]);
  const itemsSelected = useSelectedItems(idsOfSelectedItems);

  useEffect(() => {
    images && showUploadConfirm();
  }, [images])


   // Передать эту функцию в PortfolioItem вместо setIdsOfSelectedItems([]);
   const clearCheckboxs = () => {
    setIdsOfSelectedItems([]);
  }
  const { confirm } = useConfirm();

  const showConfirm = async () => {
    const checkedItemsLenght = idsOfSelectedItems?.length | 0;
    const isConfirmed = await confirm(
      checkedItemsLenght > 0
        ? `Удаление выбранных записей: ${checkedItemsLenght}`
        : 'Удаление всех записей!'
    );

    if(isConfirmed) {
      clearCheckboxs();
      deleteAllImages(idsOfSelectedItems);
      setImages(null);   
    } 
  }

  const showUploadConfirm = async () => {
    const isConfirmed = await confirm(`Добавление выбранных изображений: ${imagesLength}`);
    if (isConfirmed) {
      clearCheckboxs();
      uploadImages(images);
      setImages(null);
    }
  }


 

  const imageChangeHandler = useCallback((e: Event<HTMLInputElement>) => {
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

  const removeAllHandler = () => {
    showConfirm();
  }

  const zoomHandler = (index: number) => {
    setZoomImageIndex(index + 1);
  }


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
        idsOfSelectedItems={idsOfSelectedItems}
        setIdsOfSelectedItems={setIdsOfSelectedItems}
      />

      <PhotosGalery
        sortImages={sortImages}
        zoomImageIndex={zoomImageIndex}
        setZoomImageIndex={setZoomImageIndex}
      />

      <EditPanel
        imageChangeHandler={imageChangeHandler}
        addHandler={null}
        removeAllHandler={removeAllHandler}
        itemsSelected={itemsSelected}
        clearCheckboxs={clearCheckboxs}
      />
    </>
  )
})


export default Portfolio;