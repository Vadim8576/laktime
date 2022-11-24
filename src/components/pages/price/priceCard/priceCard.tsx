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
import { Button, Grow, Paper } from '@mui/material';
import ContextMenu from '../../../ui/contextMenu';
import { observer } from 'mobx-react-lite';
import { MenuActionType } from '../prices';
import { IPriceList } from '../../../../store/storeTypes';
import MyCardHeader from './MyCardHeader';
import MyCardMedia from './myCardMedia';
import { useLoadImage } from '../../../../hooks/useLoadImage';

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

export interface IContextMenuList {
  actionName: string;
  actionType: MenuActionType;
  confirmed: boolean;
}

const menuItemList: IContextMenuList[] = [
  {
    actionName: 'Удалить',
    actionType: 'DELETE',
    confirmed: true
  },
  {
    actionName: 'Редактировать',
    actionType: 'EDIT',
    confirmed: false
  }
];

interface IPriceCardItemProps {
  priceList: IPriceList;
  setMenuActionType: (actionType: MenuActionType) => void;
  setFormOpen: (formOpen: boolean) => void;
}

const PriceCard: React.FC<IPriceCardItemProps> = observer(
  ({ priceList, setMenuActionType, setFormOpen }) => {

    const { id, price, servicename, description, active } = priceList;
    const buttonText = active ? 'Записаться' : 'Недоступно';
    const imgIsLoading = useLoadImage(image);

    // context Menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const cardMenuOpen = Boolean(anchorEl);

    // price Description
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = useCallback(() => {
      setExpanded(!expanded);
    }, [expanded]);


    

    return (
      <Grow in={true}>
        <Card
          sx={{
            minWidth: 250,
          }}
        >
          <MyCardHeader
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

          <MyCardMedia
            imgIsLoading={imgIsLoading}
            image={image}
            id={id}
          />

          <CardActions disableSpacing>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                width: '87%',
                textAlign: 'right'
              }}
            >
              Описание услуги
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {description}
              </Typography>
            </CardContent>
          </Collapse>

          <CardContent>
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  color: 'red',
                  textAlign: 'left'
                }}
              >
                {price} &#8381;
              </Typography>
              <Button
                disabled={!active}
                size="medium"
                color="primary"
                variant="outlined"
              >
                {buttonText}
              </Button>
            </Paper>
            <p>Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь c Политикой Конфиденциальности</p>
          </CardContent>
        </Card>
      </Grow>
    );
  })

export default PriceCard;
