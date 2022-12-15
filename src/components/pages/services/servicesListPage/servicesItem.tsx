import React, { useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import image from '../../../../images/manicure.jpg';
import { Button, Checkbox, Grow, Paper } from '@mui/material';
import ContextMenu from '../../../ui/contextMenu';
import { observer } from 'mobx-react-lite';
import { IServicesContextMenu, MenuActionType } from '../../../../types/types';
import { IServicesList } from '../../../../types/types';
import ServiceItemMedia from './serviceItemMedia';
import { useLoadImage } from '../../../../hooks/useLoadImage';
import ServiceItemHeader from './serviceItemHeader';
import authStore from '../../../../store/authStore';
import { useCheckBoxChecked } from '../../../../hooks/useCheckBoxChecked';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const menuItemList: IServicesContextMenu[] = [
  {
    actionName: 'Редактировать',
    actionType: 'EDIT',
    confirmed: false
  },
  {
    actionName: 'Удалить',
    actionType: 'DELETE',
    confirmed: true
  }
];






interface IServicesCardItemProps {
  service: IServicesList;
  setMenuActionType: (actionType: MenuActionType) => void;
  setFormOpen: (formOpen: boolean) => void;
  idsOfSelectedItems: number[];
  setIdsOfSelectedItems: (arr: any) => void;
}

const ServicesItem: React.FC<IServicesCardItemProps> = observer(
  ({ ...props }) => {
    const { service, setMenuActionType, setFormOpen, idsOfSelectedItems, setIdsOfSelectedItems } = props;
    const { isAuth } = authStore;
    const { id, servicename, price, description, active } = service;
    const buttonText = active ? 'Записаться' : 'Недоступно';

    const checked = useCheckBoxChecked(idsOfSelectedItems, +id)

    // const imgIsLoading = useLoadImage(image);

    // context Menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const cardMenuOpen = Boolean(anchorEl);

    const serviceItemChangeHandler = useCallback(() => {
      setIdsOfSelectedItems((checkedIds: number[]) => {
        if(checkedIds.includes(+id)) {
          return checkedIds.filter((checkedId: number) => checkedId !== +id)
        } else {
          return [...checkedIds, id]
        }       
      })
    }, [id])

    return (
      <>
        <CardContent
          sx={{
            paddingLeft: 0,
            paddingRight: 0,
            visibility: isAuth ? 'visible' : 'hidden'
          }}
        >
          <Checkbox
            checked={checked}
            sx={{
              padding: '5px'
            }}
            onChange={serviceItemChangeHandler}
          />
        </CardContent>

        <Card
          sx={{
            width: '60%',
            minWidth: 200,
            border: 'none'
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
            menuItemList={menuItemList}
            id={id}
            setMenuActionType={setMenuActionType}
            setFormOpen={setFormOpen}
          />

          <CardContent sx={{ paddingTop: 0, paddingBottom: '24px' }}>
            <Typography>
              {description}
            </Typography>
          </CardContent>

          <CardContent
            sx={{
              paddingTop: 0,
              paddingBottom: '8px',
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
              // paddingTop: 0,
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
