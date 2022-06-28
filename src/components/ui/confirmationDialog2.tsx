import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { DialogContentText } from '@mui/material';



interface IConfirmationDialog {
  confirmationDialogOpen: boolean;
  setConfirmationDialogOpen: (confirmationDialogOpen: boolean) => void;
  setConfirmed: (confirmed: boolean) => void;
}

const ConfirmationDialog2: React.FC<IConfirmationDialog> =
({ confirmationDialogOpen, setConfirmationDialogOpen, setConfirmed }) => {
  
  const onClose = () => {
    setConfirmationDialogOpen(false);
  }

  const handleCancel = () => {
    onClose();
    setConfirmed(false);
  };

  const handleOk = () => {
    onClose();
    setConfirmed(true);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={confirmationDialogOpen}
    >
      <DialogTitle>Вы уверены, что хотите удалить запись?</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>Это действие нельзя отменить!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
}


export default ConfirmationDialog2;