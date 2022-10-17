import { observer } from 'mobx-react-lite';
import * as React from 'react';
import authStore from '../../../store/authStore';
import ShowMessage from '../../popupMessages/showMessage';
import PriceGrid from './priceGrid';
import PriceForm from './priceForm';
import EditMenu from '../../ui/editMenu';
import priceStore from '../../../store/priceStore';


interface IPricesProps {
  // error: string;
  // success: boolean;
}


export type MenuActionType = '' | 'EDIT' | 'DELETE' | 'ADD' | 'DELETE-ALL';

const Prices: React.FC<IPricesProps> = observer(() => {
  const { isAuth } = authStore;
  const { priceError, priceSuccess } = priceStore;
  const [formOpen, setFormOpen] = React.useState<boolean>(false);
  const [menuActionType, setMenuActionType] = React.useState<MenuActionType>('ADD');

  return (
    <>
      <ShowMessage
        error={priceError}
        success={priceSuccess}
      />

      <PriceGrid
        setFormOpen={setFormOpen}
        menuActionType={menuActionType}
        setMenuActionType={setMenuActionType}
      />
      <PriceForm
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        menuActionType={menuActionType}
      />
      {isAuth &&
        <EditMenu
          setFormOpen={setFormOpen}
          setMenuActionType={setMenuActionType}
        />
      }
    </>
  )
})


export default Prices;