import React, { useCallback } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { IContextMenuList } from '../pages/price/priceCard';
import useConfirm from "../../hooks/useConfirm";




interface ICardMenuProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: (anchorEl: null | HTMLElement) => void;
  cardMenuOpen: boolean;
  menuItemList: IContextMenuList[];
  id: string;
}


const ContextMenu: React.FC<ICardMenuProps> = ({
  anchorEl,
  setAnchorEl,
  cardMenuOpen,
  menuItemList,
  id
}) => {


  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClick = (index: number) => {
    const confirmed = menuItemList[index].confirmed;
    showConfirm(confirmed, index);
    handleClose();
  };


  const { confirm } = useConfirm();

  const showConfirm = async (confirmed: boolean, index: number) => {
    let isConfirmed;

    confirmed
    ? isConfirmed = await confirm('Удалить эту запись?')
    : isConfirmed = true

    isConfirmed && menuItemList[index].onConfirm(id);   
  }



  return (
    <>
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
    </>
  )
}


export default ContextMenu;