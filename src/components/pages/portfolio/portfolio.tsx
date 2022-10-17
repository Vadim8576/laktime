import { observer } from 'mobx-react-lite';
import React, { useState, useCallback } from 'react';
import authStore from '../../../store/authStore';
import portfolioStore from '../../../store/portfolioStore';
import ErrorMessage from '../../popupMessages/showMessage';
import ShowMessage from '../../popupMessages/showMessage';
// import PriceGrid from './priceGrid';
// import PriceForm from './priceForm';
// import EditMenu from '../../ui/editMenu';
import PortfolioGrid from './portfolioGrid';
import PortfolioPanel from './PortfolioPanel';


export interface Event<T = EventTarget> {
  target: T;
}

export type MenuActionType = '' | 'EDIT' | 'DELETE' | 'ADD' | 'DELETE-ALL';

interface IPortfolioProps {
  // error: string;
  // success: boolean;
}

const Portfolio: React.FC<IPortfolioProps> = observer(() => {
  const { isAuth } = authStore;
  const { uploadImages, deleteAllImages, portfolioError, portfolioSuccess } = portfolioStore;
  // const [formOpen, setFormOpen] = React.useState<boolean>(false);
  // const [menuActionType, setMenuActionType] = React.useState<MenuActionType>('ADD');

  const [images, setImages] = useState<any>(null);

  const changeHandler = (e: Event<HTMLInputElement>) => {
    console.log('changeHandler')
    const data = new FormData();
    const files = { ...e.target.files };
    e.target.files = null;
    e.target.value = '';
    for (let key in files) {
      // 'image_path' - эта метка установлена на сервере
      data.append(`image_path`, files[key]);
    }
    setImages(data);
  }

  const uploadHandler = () => {
    console.log('uploadHandler')
    uploadImages(images);
    setImages(null);
  }

  const removeAllHandler = () => {
    console.log('removeAllHandler')
    deleteAllImages();
    setImages(null);
  }


  return (
    <>
      <ShowMessage
        error={portfolioError}
        success={portfolioSuccess}
      />
      <PortfolioGrid />

      {isAuth &&
        <PortfolioPanel
          changeHandler={changeHandler}
          uploadHandler={uploadHandler}
          removeAllHandler={removeAllHandler}
        />
      }

      {/* <ImageGrid
        setFormOpen={setFormOpen}
        menuActionType={menuActionType}
        setMenuActionType={setMenuActionType}
      /> */}
      {/* <PriceForm
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        menuActionType={menuActionType}
      />
      {isAuth &&
        <EditMenu
          setFormOpen={setFormOpen}
          setMenuActionType={setMenuActionType}
        />
      } */}
    </>
  )
})


export default Portfolio;