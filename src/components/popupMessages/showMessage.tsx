import React, { useEffect, useCallback } from "react";
import { Alert, Box } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { observer } from "mobx-react-lite";


interface IErrorShowProps { 
  error: string;
  success: boolean;
}

const ShowMessage: React.FC<IErrorShowProps> = observer(({ ...props }) => {

  const {error, success} = props;
  const severity = error ? 'error' : 'success';
  const [open, setOpen] = React.useState<boolean>(false);
  
  useEffect(() => {
    (error !== '' || success) ? setOpen(true) : setOpen(false);
  }, [error, success])
  
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [])

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {severity === 'error' ? error : 'Операция выполнена успешно!'}
      </Alert>     
    </Snackbar>
  )

})


export default ShowMessage;