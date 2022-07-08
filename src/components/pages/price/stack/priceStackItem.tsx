import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grow, Paper, Skeleton, Stack } from '@mui/material';
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


export interface IPriceStackItemProps {
  price: IPriceList;
}


export const PriceStackItem: React.FC<IPriceStackItemProps> = ({ price }) => {

  const [imgIsLoading, setImgIsLoading] = useState(true)

  useEffect(() => {
    const img = new Image();
    img.src = cardPhoto;
    img.onload = () => {
      setImgIsLoading(false);
    }
  }, [])

  return (
    <Grow in={true}>
      <Card
        sx={{
          width: '100%',
          padding: '0 16px 16px 0'
        }}
        elevation={2}
      >
        <CardActionArea
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '16px'
          }}
        >
          {!imgIsLoading
            ?
            <Grow in={true}>
              <CardMedia
                component="img"
                image={cardPhoto}
                alt={price.servicename}
                sx={{
                  background: '#e9e9e9',
                  width: '125px',
                  height: '125px',
                  borderRadius: '4px 0 4px 0'
                }}
              />
            </Grow>
            :
            <Grow in={true}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width='125px'
                height='125px'
                sx={{borderRadius: '4px'}}
              />
            </Grow>
          }
          <CardContent sx={{
            width: '90%',
            padding: '0 0 0 26px'
          }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                letterSpacing: '1.8px'
              }}
            >
              {price.servicename}
            </Typography>
            <CustomizedTypography
              variant="body2"
              color="text.secondary"
              sx={{
                letterSpacing: '1px'
              }}
            >
              {price.description}
            </CustomizedTypography>
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
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            justifyContent: 'right',
            padding: '0'
          }}
        >
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
