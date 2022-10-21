import React, { useEffect, useCallback } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { IContextMenuList } from '../pages/price/priceCard';
import useConfirm from "../../hooks/useConfirm";
import usePayload from "../../hooks/usePayload";
import formStore from "../../store/formStore";
import priceStore from "../../store/priceStore";
import { MenuActionType } from '../pages/price/prices';


interface ICardMenuProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: (anchorEl: null | HTMLElement) => void;
  cardMenuOpen: boolean;
  menuItemList: IContextMenuList[];
  id: string;
  setMenuActionType: (actionType: MenuActionType) => void;
  setFormOpen: (formOpen: boolean) => void;
}

const ContextMenu: React.FC<ICardMenuProps> = ({
  anchorEl,
  setAnchorEl,
  cardMenuOpen,
  menuItemList,
  id,
  setMenuActionType,
  setFormOpen
}) => {


  const [isConfirmed, setIsConfirmed] = React.useState<boolean>(false);
  const [itemNumber, setItemNumber] = React.useState<number | null>(null);
  const { confirm } = useConfirm();
  const { formOnSubmit } = usePayload();


  useEffect(() => {
    if (isConfirmed && itemNumber !== null) {
      formStore.setId(id);
      const type = menuItemList[itemNumber].actionType;
      switch (type) {
        case 'DELETE':
          formOnSubmit(type);
          break;
        case 'EDIT':
          const data = priceStore.getPriceValues(id);
          formStore.setDefaultFormData(data);
          setMenuActionType(type);
          setFormOpen(true);
          break;
        default:
      }
      setItemNumber(null);
      setIsConfirmed(false);
    }
  }, [isConfirmed])


  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClick = useCallback((index: number) => {
    const ind: string = index.toString();
    const confirmed = menuItemList[index].confirmed;
    setItemNumber(index);
    confirmed ? showConfirm(ind) : setIsConfirmed(true);
    handleClose();
  }, []);

  const showConfirm = async (ind: string) => {
    const confirmed = await confirm('Вы уверены?')
    confirmed && setIsConfirmed(true)
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
      {menuItemList.map((menuItem: IContextMenuList, index: number) => {
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