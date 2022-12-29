import React, { useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Checkbox } from '@mui/material';
import ContextMenu from '../../../ui/contextMenu';
import { observer } from 'mobx-react-lite';
import { ContextMenuAction } from '../../../../types/types';
import { IServicesList } from '../../../../types/types';
import ServiceItemHeader from './serviceItemHeader';
import authStore from '../../../../store/authStore';
import { useCheckBox } from '../../../../hooks/useCheckBox';
import servicesStore from '../../../../store/servicesStore';
import formStore from '../../../../store/formStore';




interface IServicesCardItemProps {
  service: IServicesList;
  setContextMenuAction: (contextMenuAction: ContextMenuAction) => void;
  setFormOpen: (formOpen: boolean) => void;
  idsOfSelectedItems: number[];
  setIdsOfSelectedItems: (arr: any) => void;
}

const ServicesItem = observer(
  ({ ...props }: IServicesCardItemProps) => {
    const { service, setContextMenuAction, setFormOpen, idsOfSelectedItems, setIdsOfSelectedItems } = props;
    const { isAuth } = authStore;
    const { id, servicename, price, description, active } = service;
    const buttonText = active ? 'Записаться' : 'Недоступно';

    const { setNewIds, checkboxChecked } = useCheckBox();
    const checked = checkboxChecked(idsOfSelectedItems, id);

    // context Menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const cardMenuOpen = Boolean(anchorEl);

    const changeHandler = useCallback(() => {
      setIdsOfSelectedItems((ids: number[]) => setNewIds(ids, id));
    }, [id]);



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
      <>
        <CardContent
          sx={{
            paddingLeft: 0,
            paddingRight: 0,
            visibility: isAuth ? 'visible' : 'hidden',
            width: isAuth ? 'auto' : 0
          }}
        >
          <Checkbox
            checked={checked}
            sx={{
              padding: 0,
              paddingRight: '5px',
            }}
            onChange={changeHandler}
          />
        </CardContent>

        <Card
          sx={{
            width: '50%',
            // minWidth: 200,
            border: 'none',
            backgroundColor: 'none'
          }}
          variant="outlined"
        >

          <ServiceItemHeader
            setAnchorEl={setAnchorEl}
            servicename={servicename}
            id={id}
          />

          <ContextMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            cardMenuOpen={cardMenuOpen}
            actionsOfContextMenu={actionsOfContextMenu}
          />

          <CardContent sx={{ paddingTop: 0, paddingBottom: '24px' }}>
            <Typography>
              {description}
            </Typography>
          </CardContent>

          <CardContent
            sx={{
              paddingTop: 0,
              paddingBottom: '10px',
              borderBottom: '1px #d9d9d9 solid'
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                color: 'red',
                textAlign: 'left',
              }}
            >
              {price} &#8381;
            </Typography>
          </CardContent>

          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '10px 0 8px 0'
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
        </Card>
      </>
    );
  })

export default ServicesItem;
