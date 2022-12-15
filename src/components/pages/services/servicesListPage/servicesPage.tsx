import React, { useState, useEffect } from 'react';
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
import { IDeleteButtonText, MenuActionType } from '../../../../types/types';



const ServicesPage = observer(() => {
  const { servicesError, servicesSuccess } = servicesStore;
  const [ formOpen, setFormOpen ] = useState<boolean>(false);
  const [ menuActionType, setMenuActionType ] = useState<MenuActionType>('');
  const [ idsOfSelectedItems, setIdsOfSelectedItems ] = useState<number[]>([])
  const [ deleteButtonText, setDeleteButtonText ] = useState<IDeleteButtonText>('Удалить все');
  const { confirm } = useConfirm();
  const { formOnSubmit } = usePayload();

  useEffect(() => {
    console.log(idsOfSelectedItems)
    setDeleteButtonText(idsOfSelectedItems.length > 0 ? 'Удалить выбранные': 'Удалить все')
  }, [idsOfSelectedItems])

  const showConfirm = async () => {
    const checkedItemsLenght = idsOfSelectedItems.length;
    const isConfirmed = await confirm(
      checkedItemsLenght > 0
        ? `Удалить выбранные записи? (${checkedItemsLenght})`
        : 'Удалить все записи?'
    );
    if (isConfirmed) formOnSubmit(
      checkedItemsLenght > 0
        ? 'DELETE-ARRAY'
        : 'DELETE-ALL',
        idsOfSelectedItems
    );
    setIdsOfSelectedItems([]);
  }

  const addHandler = () => {
    formStore.clearDefaultFormData();
    setMenuActionType('ADD');
    setFormOpen(true);
  }

  const removeAllHandler = () => {
    showConfirm();
  }

  const clearCheckboxs = () => {
    setIdsOfSelectedItems([]);
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