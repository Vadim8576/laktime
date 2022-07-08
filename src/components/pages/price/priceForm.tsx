import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import priceStore from '../../../store/priceStore';
import { Checkbox, FormControlLabel } from '@mui/material';


interface IService {
  servicename: string;
  price: string;
  description: string;
  active: string;
}

interface IPriceForm {
  formOpen: boolean;
  setFormOpen: (formOpen: boolean) => void;
}

const resetFormObj: IService = {
  servicename: '',
  price: '',
  description: '',
  active: ''
};

const PriceForm: React.FC<IPriceForm> = ({ formOpen, setFormOpen }) => {

  const validationSchema = Yup.object().shape({
    servicename: Yup.string()
      .required('Введите название услуги'),
    price: Yup.number()
      .min(0, 'Стоимость не может быть отритцательной')
      .required('Введите корректную стоимость услуги'),
    // .min(6, 'Username must be at least 6 characters')
    // .max(8, 'Username must not exceed 20 characters'),
    description: Yup.string()
      .required('Введите описание услуги'),
    active: Yup.bool()
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IService>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    reset(resetFormObj);
  }, [formOpen])
 
  const onSubmit = (data: any) => {
    console.log(data)
    let payload = {...data, active: `${data.active}`};
    priceStore.addPrice(payload);
    setFormOpen(false);
  };


  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFormOpen(false);
    reset(resetFormObj);
  };


  return (
    <div>
      <Dialog open={formOpen} onClose={handleClose}>
        <DialogTitle>Добавить услугу</DialogTitle>
        <DialogContent dividers sx={{
          paddingBottom: '32px'
        }}>
          <DialogContentText mb={4}>
            Введите название, стоимость, краткое описание услуги, а также укажите будет ли услуга активна.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="service"
            label="Название услуги"
            fullWidth
            variant="outlined"
            {...register('servicename')}
            error={errors.servicename ? true : false}
            helperText={errors.servicename?.message}
          />

          <TextField
            margin="normal"
            id="price"
            label="Стоимость"
            // fullWidth
            variant="outlined"
            type="number"
            {...register('price')}
            error={errors.price ? true : false}
            helperText={errors.price?.message}
          />

          <TextField
            margin="normal"
            id="description"
            label="Описание"
            fullWidth
            variant="outlined"
            {...register('description')}
            error={errors.description ? true : false}
            helperText={errors.description?.message}
          />

          <FormControlLabel
            control={
              <Checkbox defaultChecked {...register('active')
            } />}
            label="Услуга доступна для заказа"
          />


        </DialogContent>
        <DialogActions>
          <Button name="cancel" onClick={handleClose}>Отмена</Button>
          <Button name="add" onClick={handleSubmit(onSubmit)}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PriceForm;