import React, { useEffect } from "react";
import { Alert, Box } from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { observer } from "mobx-react-lite";

interface IErrorShowProps {
  success: boolean;
}

const SuccessMessage: React.FC<IErrorShowProps> = ({ success }) => {

  // console.log('SuccessShow', success)

  const [open, setOpen] = React.useState<boolean>(false);



  useEffect(() => {
    setOpen(success);
  }, [success])
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{top: '65px'}}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Операция выполнена успешно!
      </Alert>
    </Snackbar>
  )

  }

export default SuccessMessage;