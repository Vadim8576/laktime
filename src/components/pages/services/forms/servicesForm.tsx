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
import useFormTitle from '../../../../hooks/useFormTitle';
import { useState } from 'react';
import { ContextMenuAction } from '../../../../types/types';
import { IService } from '../../../../types/types';
import ImageChangeArea from '../../../widgets/imageChangeArea';



interface IServiceFormProps {
  formOpen: boolean;
  setFormOpen: (formOpen: boolean) => void;
  contextMenuAction: ContextMenuAction;
}

const ServicesForm = observer(({ formOpen, setFormOpen, contextMenuAction }: IServiceFormProps) => {

  // получаем дефолтные данные формы из стора
  const defaultFormData: IService = formStore.defaultFormData;


  console.log(defaultFormData.image_name)

  const [checkBoxChecked, setCheckBoxChecked] = useState<boolean>(false);

  const [image, setImage] = useState<string>('');

  const formTittle = useFormTitle(defaultFormData);

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
    if (formOpen) {
      reset(defaultFormData);
      setCheckBoxChecked(defaultFormData.active);
      setImage(defaultFormData.image_name)
    }
  }, [formOpen, defaultFormData])



  const onSubmit = (data: any) => {

    const payload = { ...data, active: `${data.active}` };
    console.log(payload)
    console.log(image)

    const formData = new FormData();
    formData.append('service', JSON.stringify(payload));
    formData.append('image_name', image);

    setPayload(formData);
    formOnSubmit(contextMenuAction);
    setFormOpen(false);
    setImage('');
  };

  const handleClose = () => {
    setFormOpen(false);
    reset(defaultFormData);
    setImage('');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxChecked(event.target.checked);
  }

  return (
    <Dialog open={formOpen} onClose={handleClose}>
      <DialogTitle>{formTittle}</DialogTitle>
      <DialogContent dividers>
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
          multiline
          rows={2}
          fullWidth
          variant="outlined"
          {...register('description')}
          error={errors.description ? true : false}
          helperText={errors.description?.message}
        />

        <FormControlLabel
          control={
            <Checkbox
              // defaultChecked
              {...register('active')}
              checked={checkBoxChecked}
              onChange={handleChange}
            />
          }
          label="Услуга доступна для записи"
        />

        <ImageChangeArea
          setImage={setImage}
          image={image}
        />

      </DialogContent>
      <DialogActions>
        <Button name="cancel" onClick={handleClose}>Отмена</Button>
        <Button name="add" onClick={handleSubmit(onSubmit)}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
})

export default ServicesForm;







