import React, { useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Checkbox, FormControlLabel } from '@mui/material';
import usePayload from '../../../../hooks/usePayload';
import { observer } from 'mobx-react-lite';
import formStore from '../../../../store/formStore';
import useFormText from '../../../../hooks/useFormText';
import { useState } from 'react';
import { MenuActionType } from '../../../../types/types';
import ChangeImage from '../../../widgets/changeImage';
import { IService } from '../../../../types/types';


interface IServiceFormProps {
  formOpen: boolean;
  setFormOpen: (formOpen: boolean) => void;
  menuActionType: MenuActionType;
}

const servicesForm: React.FC<IServiceFormProps> = observer(({ formOpen, setFormOpen, menuActionType }) => {

  // получаем дефолтные данные формы из стора
  const defaultFormData: IService = formStore.defaultFormData;

  const [checkBoxState, setCheckBoxState] = useState<boolean>(defaultFormData.active);
  const formTittle = useFormText(defaultFormData);
  const { setPayload, formOnSubmit } = usePayload();

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
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IService>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    reset(defaultFormData);
    setCheckBoxState(defaultFormData.active);
  }, [formOpen])

  const onSubmit = (data: any) => {
    console.log(data)
    console.log('actionType = ', menuActionType)
    const payload = { ...data, active: `${data.active}` };

    setPayload(payload);

    formOnSubmit(menuActionType);
    setFormOpen(false);
  };

  const handleClose = () => {
    setFormOpen(false);
    reset(defaultFormData);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxState(event.target.checked);
  }



  return (
    <div>
      <Dialog open={formOpen} onClose={handleClose}>
        <DialogTitle>{formTittle}</DialogTitle>
        <DialogContent dividers sx={{
          paddingBottom: '32px'
        }}>
          <DialogContentText mb={4}>
            Введите название, стоимость, краткое описание услуги, а также укажите, будет ли услуга доступна для записи.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="service"
            label="Название"
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

          <ChangeImage />

          <FormControlLabel
            control={
              <Checkbox
                // defaultChecked
                {...register('active')}
                checked={checkBoxState}
                onChange={handleChange}
              />
            }
            label="Услуга доступна для записи"
          />

        </DialogContent>
        <DialogActions>
          <Button name="cancel" onClick={handleClose}>Отмена</Button>
          <Button name="add" onClick={handleSubmit(onSubmit)}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})

export default servicesForm;







