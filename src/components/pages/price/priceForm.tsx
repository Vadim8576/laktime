import * as React from 'react';
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
import { IPrice } from '../../../store/priceStoreTypes';


interface IService {
  servicename: string;
  price: string;
  description: string;
  active: string;
}

interface IPriceForm {
  formOpen: boolean;
  setFormOpen: (formOpen: boolean) => void;
  addPrice: (price: IPrice) => void;
}

const PriceForm: React.FC<IPriceForm> = ({ formOpen, setFormOpen, addPrice }) => {

  const validationSchema = Yup.object().shape({
    servicename: Yup.string()
      .required('Введите название услуги'),
    price: Yup.string()
      .required('Введите стоимость услуги'),
      // .min(6, 'Username must be at least 6 characters')
      // .max(20, 'Username must not exceed 20 characters'),
    description: Yup.string()
      .required('Введите описание услуги'),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IService>({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = (data: any) => {
    addPrice(data)
    setFormOpen(false);
  };


  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFormOpen(false);

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
            error={errors.servicename ? true: false}
            helperText={errors.servicename?.message}
          />
          <TextField
            margin="normal"
            id="price"
            label="Стоимость"
            fullWidth
            variant="outlined"
            type="number"
            {...register('price')}
            error={errors.price ? true: false}
            helperText={errors.price?.message}
          />
          <TextField
            margin="normal"
            id="description"
            label="Описание"
            fullWidth
            variant="outlined"
            {...register('description')}
            error={errors.description ? true: false}
            helperText={errors.description?.message}
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



// return (
//   <form onSubmit={handleSubmit(onSubmit)}>
//     <input {...register("singleErrorInput", { required: true })} />
//     {errors.singleErrorInput && "Your input is required"}

//     {/* refer to the type of error to display message accordingly */}
//     <input {...register("multipleErrorInput", { required: true, maxLength: 50 })} />
//     {errors.multipleErrorInput?.type === "required" && "Your input is required"}
//     {errors.multipleErrorInput?.type === "maxLength" && "Your input exceed maxLength"}

//     {/* register with validation */}
//     <input type="number" {...register("numberInput", { min: 50 })} />
//     {errors.numberInput && "Your input required to be more than 50"}

//     {/* register with validation and error message */}
//     <input {...register("errorMessage", { required: "This is required" })} />
//     {errors.errorMessage?.message}

//     <input type="submit" />
//   </form>
// );


export default PriceForm;