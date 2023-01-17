import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, useMediaQuery } from '@mui/material';
import ContextMenu from '../../../ui/contextMenu';
import { observer } from 'mobx-react-lite';
import { ContextMenuAction } from '../../../../types/types';
import { IServicesList } from '../../../../types/types';
import ServiceItemHeader from './serviceItemHeader';
import servicesStore from '../../../../store/servicesStore';
import formStore from '../../../../store/formStore';
import { toRub } from '../../../../helpers/toRub';
import Stack from '@mui/material/Stack';
import { ImagePreview } from '../../../ui/imagePreview';
import { Link } from 'react-router-dom';
import { useCheckBox } from '../../../../hooks/useCheckBox';
import { ServiceItemMedia } from './serviceItemMedia';


const BASE_URL = process.env.REACT_APP_BASE_URL as string;

const linkStyle = {
  outline: 'none',
  textDecoration: 'none',
  fontSize: '1.2rem'
}

interface IServicesCardItemProps {
  service: IServicesList;
  setContextMenuAction: (contextMenuAction: ContextMenuAction) => void;
  setFormOpen: (formOpen: boolean) => void;
  idsOfSelectedItems: number[];
  setIdsOfSelectedItems: (arr: any) => void;
}

export const ServicesItem = observer(({ ...props }: IServicesCardItemProps) => {
  const { service, setContextMenuAction, setFormOpen, idsOfSelectedItems, setIdsOfSelectedItems } = props;
  const { id, servicename, price, description, active, image_name } = service;
  const buttonText = active ? 'Записаться' : 'Недоступно';
  const { checkboxChecked } = useCheckBox();
  const checked = checkboxChecked(idsOfSelectedItems, id);
  const matches = useMediaQuery('(max-width:700px)');
  // context Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const cardMenuOpen = Boolean(anchorEl);

  const actionsOfContextMenu = {
    delete: () => {
      formStore.setId(id);
      servicesStore.deleteService(id);
    },
    edit: () => {
      formStore.setId(id);
      const data = servicesStore.getServiceValues(id);

      console.log(data)

      formStore.setDefaultFormData(data);
      setContextMenuAction('EDIT');
      setFormOpen(true);
    }
  }



  return (
    <Card
      sx={{
        width: matches ? '100%' : '50%',
        backgroundColor: checked ? 'aliceblue' : ''
      }}
      variant="outlined"
    >

      <ServiceItemHeader
        setAnchorEl={setAnchorEl}
        servicename={servicename}
        id={id}
        idsOfSelectedItems={idsOfSelectedItems}
        setIdsOfSelectedItems={setIdsOfSelectedItems}
      />

      <ContextMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        cardMenuOpen={cardMenuOpen}
        actionsOfContextMenu={actionsOfContextMenu}
      />

      <Link
        to={`../card-detail/${id}`}
        style={linkStyle}
      >
        <ServiceItemMedia imageName={image_name} />
      </Link>

      <CardContent sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          paddingBottom: 0,
          borderBottom: '0px #d9d9d9 solid'
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: '#666',
            textAlign: 'left',
          }}
        >
          Стоимость: {toRub(price)}
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 16px 0 0'
        }}
      >
        <Button
          disabled={!active}
          size="medium"
          color="primary"
          variant="outlined"
        >
          {buttonText}
        </Button>
        {/* <p>Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь c Политикой Конфиденциальности</p> */}
      </CardContent>
    </Card >
  );
})

