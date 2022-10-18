import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '../../../store/authStore';
import portfolioStore from '../../../store/portfolioStore';
import ShowMessage from '../../popupMessages/showMessage';
import PortfolioGrid from './portfolioGrid';
import PortfolioPanel from '../../ui/EditPanel';
import useConfirm from '../../../hooks/useConfirm';


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
  const [ images, setImages ] = useState<any>(null);
  const { confirm } = useConfirm();

  const changeHandler = (e: Event<HTMLInputElement>) => {
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

  const addHandler = () => {
    uploadImages(images);
    setImages(null);
  }

  const showConfirm = async () => {
    const isConfirmed = await confirm('Удалить все записи?');
    if(isConfirmed) {
      deleteAllImages();
      setImages(null);
    }
  }

  const removeAllHandler = () => {
    showConfirm();  
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
          addHandler={addHandler}
          removeAllHandler={removeAllHandler}
        />
      }
    </>
  )
})


export default Portfolio;