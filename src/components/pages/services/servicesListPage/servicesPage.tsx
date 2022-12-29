import React, { useState, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import ShowMessage from '../../../popupMessages/showMessage';
import ServicesForm from '../forms/servicesForm';
import servicesStore from '../../../../store/servicesStore';
import formStore from '../../../../store/formStore';
import useConfirm from '../../../../hooks/useConfirm';
import EditPanel from '../../../widgets/EditPanel';
import ServicesList from './servicesList';
import PortfolioExamples from '../../../widgets/portfolioExamples';
import { ContextMenuAction } from '../../../../types/types';
import { useSelectedItems } from '../../../../hooks/useSelectedItems';



const ServicesPage = observer(() => {
  const { servicesError, servicesSuccess, deleteAllServices } = servicesStore;
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [contextMenuAction, setContextMenuAction] = useState<ContextMenuAction>('');
  const [idsOfSelectedItems, setIdsOfSelectedItems] = useState<number[]>([])
  const { confirm } = useConfirm();
  const itemsSelected = useSelectedItems(idsOfSelectedItems);


  const clearCheckboxs = () => {
    setIdsOfSelectedItems([]);
  }

  const showConfirm = async () => {
    const checkedItemsLenght = idsOfSelectedItems?.length | 0;
    const isConfirmed = await confirm(
      checkedItemsLenght > 0
        ? `Удаление выбранных записей: ${checkedItemsLenght}`
        : 'Удаление всех записей!'
    );

    if (isConfirmed) {
      deleteAllServices(idsOfSelectedItems);
      clearCheckboxs();
    }
  }

  const addHandler = () => {
    formStore.clearForm();
    setContextMenuAction('ADD');
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
        setContextMenuAction={setContextMenuAction}
        idsOfSelectedItems={idsOfSelectedItems}
        setIdsOfSelectedItems={setIdsOfSelectedItems}
      />

      <PortfolioExamples />

      <ServicesForm
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        contextMenuAction={contextMenuAction}
      />

      <EditPanel
        imageChangeHandler={null}
        addHandler={addHandler}
        removeAllHandler={removeAllHandler}
        itemsSelected={itemsSelected}
        clearCheckboxs={clearCheckboxs}
      />
    </>
  )
})


export default ServicesPage;