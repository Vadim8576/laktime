import React, { FC } from 'react';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import image from '../../../../images/manicure.jpg';
import { Button, Grow } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { IServicesList } from '../../../../../../../store/storeTypes';
import { useLoadImage } from '../../../../../../../hooks/useLoadImage';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import usePayload from '../../../../../../../hooks/usePayload';
import servicesStore from '../../../../../../../store/servicesStore';
import formStore from '../../../../../../../store/formStore';
import useConfirm from '../../../../../../../hooks/useConfirm';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import css from './servicesItem.module.css'
import { MenuActionType } from '../../../servicesPage';


interface IServicesCardItemProps {
  service: IServicesList;
  setMenuActionType: (actionType: MenuActionType) => void;
  setFormOpen: (formOpen: boolean) => void;
}

const ServiceItem: React.FC<IServicesCardItemProps> = observer(
  ({ service, setFormOpen, setMenuActionType }) => {

    const { formOnSubmit } = usePayload();
    const { confirm } = useConfirm();
    const { id, price, servicename, description, active } = service;
    const buttonText = active ? 'Записаться' : 'Недоступно';
    // const imgIsLoading = useLoadImage(image);

    const editButtonHandle = () => {
      formStore.setId(id);
      const data = servicesStore.getServiceValues(id);
      formStore.setDefaultFormData(data);
      setMenuActionType('EDIT');
      setFormOpen(true);
    }

    const deleteButtonHandle = async () => {
      const confirmed = await confirm('Вы уверены?')
      if (confirmed) {
        formStore.setId(id);
        formOnSubmit('DELETE');
      }
    }

    return (
      <div className={css.services__row}>
        <ServiceCheckbox />
        <div className={css.services__cell + ' ' + css.content}>
          <div className={css.content_text}>
            {/* <h3>{servicename}</h3> */}
            <Typography
              variant="h5"
              color="text.primary"
              sx={{
                width: '100%',
                // textAlign: 'right',
                marginLeft: '0'
              }}
            >
              {servicename}
            </Typography>

            <CardContent>
              <Typography sx={{ color: '#c8c8c8' }}>
                {description}
              </Typography>
            </CardContent>
          </div>
          <div className={css.content_services}>
            <div className={css.services__orderbutton}>
              <Button
                disabled={!active}
                size="medium"
                color="primary"
                variant="outlined"
                sx={{
                  letterSpacing: '1px'
                }}
              >
                {buttonText}
              </Button>
            </div>
            <div className={css.services__service}>
              {/* {price} &#8381; */}
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  marginLeft: '0'
                }}
              >
                {price} &#8381;
              </Typography>
            </div>
          </div>
        </div>

        <ServiceEdit
          editButtonHandle={editButtonHandle}
          deleteButtonHandle={deleteButtonHandle}
        />
      </div>
    )
  })

export default ServiceItem;




interface IServiceCheckboxProps {
 
}

const ServiceCheckbox: FC<IServiceCheckboxProps> = ({ }) => {
  return (
    <div className={css.services__cell + ' ' + css.checkbox}>
      <div className={css.checkbox_wrapper}>
        <Checkbox sx={{
          marginLeft: 0
        }} />
      </div>
    </div>
  )
}


interface IServiceEditButtonsProps {
  editButtonHandle: () => void;
  deleteButtonHandle: () => void;
}

const ServiceEdit: FC<IServiceEditButtonsProps> = ({ editButtonHandle, deleteButtonHandle }) => {
  return (
    <div className={css.services__cell + ' ' + css.buttons}>
      <div className={css.stack_wrapper}>
        <Stack direction="column" spacing={1}>
          <IconButton
            color="primary"
            onClick={editButtonHandle}
          >
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={deleteButtonHandle}
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </Stack>
      </div>
    </div>
  )
}