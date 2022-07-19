import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { DialogContentText } from '@mui/material';
import useConfirm from '../../hooks/useConfirm';
import { observer } from 'mobx-react-lite';


const ConfirmDialog = observer(() => {

    const { onConfirm, onCancel, confirmState } = useConfirm();

    const onClose = useCallback(() => {
      onCancel();
    }, [])

    const handleOk = useCallback(() => {
      onConfirm();
      onClose();
    }, [])
   
    
    return (
      <Dialog
        open={confirmState.show}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {confirmState?.text && confirmState.text}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Это действие нельзя будет отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={handleOk} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    );
  })


export default ConfirmDialog;