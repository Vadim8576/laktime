import React, { FC, useState } from "react";
import { observer } from 'mobx-react-lite';
import servicesStore from "../../../../store/servicesStore";
import { MenuActionType } from '../../../../types/types';
import { IServicesList } from '../../../../types/types';
import NoData from "../../../widgets/noData";
import styled from 'styled-components';
import ServicesItem from "./servicesItem";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';



interface IServicesListProps {
  setFormOpen: (formOpen: boolean) => void;
  setMenuActionType: (actionType: MenuActionType) => void;
  idsOfSelectedItems: number[];
  setIdsOfSelectedItems: (arr: number[]) => void;
}

const ServicesList: FC<IServicesListProps> = observer(({ ...props }) => {

  const { setFormOpen, setMenuActionType, idsOfSelectedItems, setIdsOfSelectedItems } = props;
  const { sortServices, servicesListLength } = servicesStore;
  if (!servicesListLength) return <NoData text={'Нет доступных услуг'} />

  return (
    <List sx={{ width: '100%', minWidth: 300, bgcolor: 'background.paper' }}>
      {sortServices.map((service: IServicesList) => (
        <ListItem
          alignItems='flex-start'
          sx={{
            justifyContent: 'center',
            paddingBottom: '30px'
          }}
          key={service.id}
        >
          <ServicesItem
            service={service}
            setMenuActionType={setMenuActionType}
            setFormOpen={setFormOpen}
            idsOfSelectedItems={idsOfSelectedItems}
            setIdsOfSelectedItems={setIdsOfSelectedItems}
          />
        </ListItem>
      ))}
    </List>
  )
})

export default ServicesList;
