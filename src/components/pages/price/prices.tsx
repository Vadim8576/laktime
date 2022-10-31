import { observer } from 'mobx-react-lite';
import React from 'react';
import ShowMessage from '../../popupMessages/showMessage';
import PriceGrid from './priceGrid';
import PriceForm from './priceForm';
import priceStore from '../../../store/priceStore';
import formStore from '../../../store/formStore';
import useConfirm from '../../../hooks/useConfirm';
import usePayload from '../../../hooks/usePayload';
import EditPanel from '../../ui/EditPanel';


export type MenuActionType = '' | 'EDIT' | 'DELETE' | 'ADD' | 'DELETE-ALL';

const Prices = observer(() => {

  const { priceError, priceSuccess } = priceStore;
  const [ formOpen, setFormOpen ] = React.useState<boolean>(false);
  const [ menuActionType, setMenuActionType ] = React.useState<MenuActionType>('');
  const { confirm } = useConfirm();
  const { formOnSubmit } = usePayload();
  
  const showConfirm = async () => {
    const isConfirmed = await confirm('Удалить все записи?');
    if(isConfirmed) formOnSubmit('DELETE-ALL');   
  }

  const addHandler = () => {
    formStore.clearDefaultFormData();
    setMenuActionType('ADD');
    setFormOpen(true);
  }

  const removeAllHandler = () => {
    showConfirm();
  }

  return (
    <>
      <ShowMessage
        error={priceError}
        success={priceSuccess}
      />

      <PriceGrid
        setFormOpen={setFormOpen}
        setMenuActionType={setMenuActionType}
      />

      <PriceForm
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        menuActionType={menuActionType}
      />
     
      <EditPanel
        changeHandler={null}
        addHandler={addHandler}
        removeAllHandler={removeAllHandler}
      />
    </>
  )
})


export default Prices;