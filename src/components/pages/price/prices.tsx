import { observer } from 'mobx-react-lite';
import * as React from 'react';
import authStore from '../../../store/authStore';
import ErrorMessage from '../../popupMessages/errorMessage';
import SuccessMessage from '../../popupMessages/successMessage';
import PriceGrid from './priceGrid';
import PriceForm from './priceForm';
import EditMenu from '../../ui/editMenu';


interface IPricesProps {
  error: string;
  success: boolean;
}


export type MenuActionType = '' | 'EDIT' | 'DELETE' | 'ADD' | 'DELETE-ALL';

const Prices: React.FC<IPricesProps> = observer(({ error, success }) => {
  const isAuth = authStore.isAuth;
  const [formOpen, setFormOpen] = React.useState<boolean>(false);
  const [menuActionType, setMenuActionType] = React.useState<MenuActionType>('ADD');

  return (
    <>
      <ErrorMessage error={error} />
      <SuccessMessage success={success} />
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