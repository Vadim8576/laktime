import React, { useEffect } from 'react';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IPriceList } from '../../../../store/priceStoreTypes';
import cardPhoto from '../../../../images/manicure.jpg';
import { Box, Button, Grow, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Skeleton } from '@mui/material';
import CardMenu from '../../../ui/cardMenu';
import ConfirmationDialog from '../../../ui/confirmationDialog';
import { observer } from 'mobx-react-lite';
import priceStore from '../../../../store/priceStore';



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
}

const PriceCardItem2: React.FC<IPriceCardItemProps> = ({ price }) => {

  const [imgIsLoading, setImgIsLoading] = React.useState(true);
  
  useEffect(() => {
    const img = new Image();
    img.src = cardPhoto;
    img.onload = () => {
      setImgIsLoading(false);
    }
  }, []);

  const [confirmed, setConfirmed] = React.useState<boolean>(false);

  useEffect(() => {
    if(confirmed) {
      console.log('удаление подтверждено, id= ', price.id)
      priceStore.deletePrice(price.id);
    }
  }, [confirmed]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={price.service}
        // subheader="September 14, 2016"
        />

        <CardMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          open={open}
          setConfirmed={setConfirmed}
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
            Краткое описание услуги
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
              size="medium"
              color="primary"
              variant="outlined"
              sx={{
                letterSpacing: '1px'
              }}
            >
              Записаться
            </Button>
          </Paper>
        </CardContent>
      </Card>
    </Grow>
  );
}


export default observer(PriceCardItem2);