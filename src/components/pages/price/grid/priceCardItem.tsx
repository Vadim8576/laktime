import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grow, Paper, Skeleton } from '@mui/material';
import cardPhoto from '../../../../images/manicure.jpg';
import { styled } from '@mui/material/styles';
import { IPriceList } from '../../../../store/priceStoreTypes';




const CustomizedTypography = styled(Typography)`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
  line-height: 16px;
  height: 32px;
`;



export interface IPriceCardItemProps {
  price: IPriceList;
}


export const PriceCardItem: React.FC<IPriceCardItemProps> = ({ price }) => {

  const [imgIsLoading, setImgIsLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.src = cardPhoto
    img.onload = () => {
      setImgIsLoading(false)
    }
  }, [])

  return (
    <Grow in={true}>
      <Card sx={{ minWidth: 250 }} elevation={3}>
        <CardActionArea>
          {!imgIsLoading
            ?
            <Grow in={true}>
              <CardMedia
                component="img"
                height="140"
                image={cardPhoto}
                alt="manicure"
                sx={{
                  background: '#e9e9e9'
                }}
              />
            </Grow>
            :
            <Grow in={true}>
              <Skeleton variant="rectangular" animation="wave" width='100%' height={140} />
            </Grow>
          }
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ letterSpacing: '1.4px' }}
            >
              {price.service}
            </Typography>
            <CustomizedTypography variant="body2" color="text.secondary" sx={{ letterSpacing: '1px' }}>
              {price.description}
            </CustomizedTypography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                color: 'red',
                textAlign: 'right'
              }}
            >
              {price.price} &#8381;
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{
          justifyContent: 'left',
          padding: '16px'
        }}>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            sx={{
              letterSpacing: '1px'
            }}
          >
            Записаться
          </Button>
        </CardActions>
      </Card>
    </Grow>
  )
}
