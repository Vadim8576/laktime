import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { IPriceList } from '../../../store/priceStore'
import cardPhoto from '../../../images/manicure.jpg';
import { styled } from '@mui/material/styles';

const CustomizedTypography = styled(Typography)`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
  line-height: 16px;
  height: 32px;
/*
  :hover {
    height: auto;
    overflow: visible;
    display: inline-block;
  }
*/
`;


export interface IPriceCardProps {
  price: IPriceList
}


export const PriceCard: React.FC<IPriceCardProps> = ({ price }) => {
  return (
    <Card sx={{ minWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={cardPhoto}
          alt="manicure"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {price.service}
          </Typography>
          <CustomizedTypography variant="body2" color="text.secondary">
            {price.description}
          </CustomizedTypography>
          <Typography gutterBottom variant="h6" component="div" sx={{
            color: 'red', textAlign: 'right'
          }}>
            {price.price} &#8381;
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{
        justifyContent: 'left'
      }}>
        {/* <Button size="small" color="primary" variant="outlined" > */}
        <Button size="small" color="primary" variant="text" >
          Записаться
        </Button>
      </CardActions>
    </Card>
  );
}
