import React, { useEffect } from "react";
import { Alert, Box } from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { observer } from "mobx-react-lite";

interface IErrorShowProps {
  error: string;
}

const ErrorMessage: React.FC<IErrorShowProps> = ({ error }) => {

  console.log('ErrorShow', error)

  const [open, setOpen] = React.useState<boolean>(false);

  console.log(open)

  useEffect(() => {
    setOpen(error ? true : false);
  }, [error])
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      // autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
  return (
    // <Box>
      <Alert
        severity="error"
        variant="filled"
        sx={{margin: '24px'}}
      >
        {/* {error} */}
      </Alert>
    // </Box>
  )
}


export default ErrorMessage;