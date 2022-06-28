import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


interface IConfirmationDialog {
  confirmationDialogOpen: boolean;
  setConfirmationDialogOpen: (confirmationDialogOpen: boolean) => void;
  callback: () => void;
}


const ConfirmationDialog: React.FC<IConfirmationDialog> =
  ({ confirmationDialogOpen, setConfirmationDialogOpen, callback }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
      setConfirmationDialogOpen(false);
    };

    const handleAgree = () => {
      handleClose();
      callback();
    };


    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={confirmationDialogOpen}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Вы уверены, что хотите удалить эту запись?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Это действие нельзя отменить в будущем!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Отмена
            </Button>
            <Button onClick={handleAgree} autoFocus>
              Да
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


export default ConfirmationDialog;