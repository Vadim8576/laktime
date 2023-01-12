import React from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import useConfirm from "../../hooks/useConfirm";
import { IServicesContextMenu } from '../../types/types';



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
  actionsOfContextMenu: any
}

const ContextMenu = ({
  anchorEl,
  setAnchorEl,
  cardMenuOpen,
  actionsOfContextMenu
}: IContextMenuProps) => {


  const handleClose = () => {
    setAnchorEl(null);
  };


  const { confirm } = useConfirm();

  const showConfirm = async () => {
    const confirmed = await confirm('Вы уверены?')
    if (confirmed) {
      actionsOfContextMenu.delete();
    }
  }

  const handleClick = (index: number) => {

    const actionType = menuItemList[index].actionType

    switch (actionType) {
      case 'DELETE':
        showConfirm();
        break;
      case 'EDIT':
        actionsOfContextMenu.edit();
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
      {menuItemList.map((menuItem: IServicesContextMenu, index: number) =>
        <MenuItem key={menuItem.actionName} onClick={() => handleClick(index)} >
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{menuItem.actionName}</ListItemText>
        </MenuItem>
      )}
    </Menu>
  )
}


export default ContextMenu;