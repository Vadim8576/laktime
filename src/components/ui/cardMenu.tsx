import React from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import ConfirmationDialog from './confirmationDialog';
import ConfirmationDialog2 from "./confirmationDialog2";


interface ICardMenu {
  anchorEl: null | HTMLElement;
  setAnchorEl: (anchorEl: null | HTMLElement) => void;
  open: boolean;
  setConfirmed: (confirmed: boolean) => void
}

const CardMenu: React.FC<ICardMenu> = ({ anchorEl, setAnchorEl, open, setConfirmed }) => {

  const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
  }

  const handleDelete = () => {
    handleClose();
    setConfirmationDialogOpen(true)
  }

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Редактировать</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>

      <ConfirmationDialog2
        confirmationDialogOpen={confirmationDialogOpen}
        setConfirmationDialogOpen={setConfirmationDialogOpen}
        setConfirmed={setConfirmed}
      />
    </>
  )
}


export default CardMenu;