import React, { useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import cardPhoto from '../../../images/manicure.jpg';
import { Button, Grow, Paper, Skeleton } from '@mui/material';
import ContextMenu from '../../ui/contextMenu';
import { observer } from 'mobx-react-lite';
import authStore from '../../../store/authStore';
import { MenuActionType } from './prices';
import { IPriceList } from '../../../store/storeTypes';


export interface IContextMenuList {
  actionName: string;
  actionType: MenuActionType;
  confirmed: boolean;
}



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




interface IPriceCardItemProps {
  price: IPriceList;
  menuActionType: MenuActionType;
  setMenuActionType: (actionType: MenuActionType) => void;
  setFormOpen: (formOpen: boolean) => void;
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


const PriceCard: React.FC<IPriceCardItemProps> = observer(
  ({ price, menuActionType, setMenuActionType, setFormOpen }) => {

    const { isAuth } = authStore;
    const buttonText = price.active ? 'Записаться' : 'Недоступно';
    const [imgIsLoading, setImgIsLoading] = React.useState<boolean>(true);

    useEffect(() => {
      const img = new Image();
      img.src = cardPhoto;
      img.onload = () => {
        setImgIsLoading(false);
      }
    }, []);


    // context Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const cardMenuOpen = Boolean(anchorEl);
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    }, []);

    // price Description
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = useCallback(() => {
      setExpanded(!expanded);
    }, [expanded]);


    return (
      <Grow in={true}>
        <Card sx={{ minWidth: 250 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={handleClick} disabled={!isAuth}>
                <MoreVertIcon />
              </IconButton>
            }
            title={price.servicename}
            subheader={price.id}
          />

          <ContextMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            cardMenuOpen={cardMenuOpen}
            menuItemList={menuItemList}
            id={price.id}
            setMenuActionType={setMenuActionType}
            setFormOpen={setFormOpen}
          />

          {!imgIsLoading
            ?
            <Grow in={true}>
              <CardMedia
                component="img"
                height="194"
                image={cardPhoto}
                alt="manicure"
                sx={{
                  background: '#e9e9e9'
                }}
              />
            </Grow>
            :
            <Grow in={true}>
              <Skeleton variant="rectangular" animation="wave" width='100%' height={194} />
            </Grow>
          }

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
                {price.description}
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
                {price.price} &#8381;
              </Typography>
              <Button
                disabled={!price.active}
                size="medium"
                color="primary"
                variant="outlined"
                sx={{
                  letterSpacing: '1px'
                }}
              >
                {buttonText}
              </Button>
            </Paper>
          </CardContent>
        </Card>
      </Grow>
    );
  })


export default PriceCard;
