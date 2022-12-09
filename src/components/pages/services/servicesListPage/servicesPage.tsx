import React from 'react';
import { observer } from 'mobx-react-lite';
import ShowMessage from '../../../popupMessages/showMessage';
// import ShowMessage from '../../../popupMessages';
import ServicesForm from '../forms/servicesForm';
import servicesStore from '../../../../store/servicesStore';
import formStore from '../../../../store/formStore';
import useConfirm from '../../../../hooks/useConfirm';
import usePayload from '../../../../hooks/usePayload';
import EditPanel from '../../../widgets/EditPanel';
import ServicesGrid from './servicesGrids/grid2/servicesGrid';
import PortfolioExamples from '../../../widgets/portfolioExamples';


export type MenuActionType = '' | 'EDIT' | 'DELETE' | 'ADD' | 'DELETE-ALL';

const ServicesPage = observer(() => {

  const { servicesError, servicesSuccess } = servicesStore;
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
        error={servicesError}
        success={servicesSuccess}
      />

      <ServicesGrid
        setFormOpen={setFormOpen}
        setMenuActionType={setMenuActionType}
      />

      <PortfolioExamples />

      <ServicesForm
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


export default ServicesPage;