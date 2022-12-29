import React from "react";
import { observer } from 'mobx-react-lite';
import servicesStore from "../../../../store/servicesStore";
import { ContextMenuAction } from '../../../../types/types';
import { IServicesList } from '../../../../types/types';
import NoData from "../../../widgets/noData";
import ServicesItem from "./servicesItem";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';



interface IServicesListProps {
  setFormOpen: (formOpen: boolean) => void;
  setContextMenuAction: (contextMenuAction: ContextMenuAction) => void;
  idsOfSelectedItems: number[];
  setIdsOfSelectedItems: (arr: number[]) => void;
}

const ServicesList = observer(({ ...props }: IServicesListProps) => {

  const { setFormOpen, setContextMenuAction, idsOfSelectedItems, setIdsOfSelectedItems } = props;
  const { sortServices, servicesListLength } = servicesStore;
  if (!servicesListLength) return <NoData text={'Нет доступных услуг'} />

  return (
    <List sx={{
      width: '100%',
      bgcolor: 'background.paper'
    }}>
      {sortServices.map((service: IServicesList) => (
        <ListItem
          alignItems='flex-start'
          sx={{
            justifyContent: 'center',
            // paddingBottom: '30px'
          }}
          key={service.id}
        >
          <ServicesItem
            service={service}
            setContextMenuAction={setContextMenuAction}
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
