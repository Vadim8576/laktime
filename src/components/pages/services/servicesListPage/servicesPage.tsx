import React, { useState, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import ShowMessage from '../../../popupMessages/showMessage';
import ServicesForm from '../forms/servicesForm';
import servicesStore from '../../../../store/servicesStore';
import formStore from '../../../../store/formStore';
import useConfirm from '../../../../hooks/useConfirm';
import usePayload from '../../../../hooks/usePayload';
import EditPanel from '../../../widgets/EditPanel';
import ServicesList from './servicesList';
import PortfolioExamples from '../../../widgets/portfolioExamples';
import { MenuActionType } from '../../../../types/types';
import { useDeleteButtonText } from '../../../../hooks/useDeleteButtonText';



const ServicesPage = observer(() => {
  const { servicesError, servicesSuccess, deleteAllServices } = servicesStore;
  const [ formOpen, setFormOpen ] = useState<boolean>(false);
  const [ menuActionType, setMenuActionType ] = useState<MenuActionType>('');
  const [ idsOfSelectedItems, setIdsOfSelectedItems ] = useState<number[]>([])
  const { confirm } = useConfirm();
  const deleteButtonText = useDeleteButtonText(idsOfSelectedItems);


  const clearCheckboxs = () => {
    setIdsOfSelectedItems([]);
  }

  const showConfirm = async () => {
    const checkedItemsLenght = idsOfSelectedItems.length;
    const isConfirmed = await confirm(
      checkedItemsLenght > 0
        ? `Удалить выбранные записи? (${checkedItemsLenght})`
        : 'Удалить все записи?'
    );

    if (isConfirmed) deleteAllServices(idsOfSelectedItems);
    clearCheckboxs();
  }

  const addHandler = () => {
    formStore.clearForm();
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

      <ServicesList
        setFormOpen={setFormOpen}
        setMenuActionType={setMenuActionType}
        idsOfSelectedItems={idsOfSelectedItems}
        setIdsOfSelectedItems={setIdsOfSelectedItems}
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
        deleteButtonText={deleteButtonText}
        clearCheckboxs={clearCheckboxs}
      />
    </>
  )
})


export default ServicesPage;