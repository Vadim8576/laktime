import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import portfolioStore from '../../../store/portfolioStore';
import useConfirm from '../../../hooks/useConfirm';
import ShowMessage from '../../popupMessages/showMessage';
import PortfolioGrid from './portfolioGrid';
import EditPanel from '../../widgets/EditPanel';
import PhotosGalery from './photosGalary';
import { useDeleteButtonText } from '../../../hooks/useDeleteButtonText';


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
  const [idsOfSelectedItems, setIdsOfSelectedItems] = useState<number[]>([]);
  const deleteButtonText = useDeleteButtonText(idsOfSelectedItems);

  useEffect(() => {
    images && showUploadConfirm();
  }, [images])

  const { confirm } = useConfirm();

  const showConfirm = async () => {
    const checkedItemsLenght = idsOfSelectedItems.length;
    const isConfirmed = await confirm(
      checkedItemsLenght > 0
        ? `Удалить выбранные записи? (${checkedItemsLenght})`
        : 'Удалить все записи?'
    );

    if (isConfirmed) {
      deleteAllImages(idsOfSelectedItems);
      setImages(null);
    }
    clearCheckboxs();
  }

  const showUploadConfirm = async () => {
    const isConfirmed = await confirm(`Добавить выбранные изображения: ${imagesLength}?`);
    if (isConfirmed) {
      uploadImages(images);
      setImages(null);
    }
  }

  const clearCheckboxs = () => {
    setIdsOfSelectedItems([]);
  }

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
        changeHandler={changeHandler}
        addHandler={null}
        removeAllHandler={removeAllHandler}
        deleteButtonText={deleteButtonText}
        clearCheckboxs={clearCheckboxs}
      />
    </>
  )
})


export default Portfolio;