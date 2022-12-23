import React from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import useConfirm from "../../hooks/useConfirm";
import formStore from "../../store/formStore";
import servicesStore from "../../store/servicesStore";
import { IServicesContextMenu, MenuActionType } from '../../types/types';



const menuItemList: IServicesContextMenu[] = [
  {
    actionName: 'Редактировать',
    actionType: 'EDIT',
    confirmed: false
  },
  {
    actionName: 'Удалить',
    actionType: 'DELETE',
    confirmed: true
  }
];

interface IContextMenuProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: (anchorEl: null | HTMLElement) => void;
  cardMenuOpen: boolean;
  id: number;
  setMenuActionType: (actionType: MenuActionType) => void;
  setFormOpen: (formOpen: boolean) => void;
}

const ContextMenu: React.FC<IContextMenuProps> = ({
  anchorEl,
  setAnchorEl,
  cardMenuOpen,
  id,
  setMenuActionType,
  setFormOpen
}) => {

  const { confirm } = useConfirm();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showConfirm = async () => {
    const confirmed = await confirm('Вы уверены?')
    if (confirmed) {
      servicesStore.deleteService(id);
    }
  }

  

  const handleClick = (index: number) => {

    formStore.setId(id);
    const actionType = menuItemList[index].actionType

    switch(actionType) {
      case 'DELETE':
        showConfirm()
        break;
      case 'EDIT':
        const data = servicesStore.getServiceValues(id);

        console.log(data)

        formStore.setDefaultFormData(data);
        setMenuActionType(menuItemList[index].actionType);
        setFormOpen(true);
        break;
      default:
    }

    handleClose();
  }


  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={cardMenuOpen}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {menuItemList.map((menuItem: IServicesContextMenu, index: number) => {
        return (
          <MenuItem key={menuItem.actionName} onClick={() => handleClick(index)} >
            <ListItemIcon>
              <EditOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{menuItem.actionName}</ListItemText>
          </MenuItem>
        )
      })}
    </Menu>
  )
}


export default ContextMenu;