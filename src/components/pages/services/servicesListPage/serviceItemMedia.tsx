import React from 'react';
import { Skeleton } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


const style = {
  background: '#e9e9e9',
  '&:hover': {
    cursor: 'pointer',
  }
}

interface IServiceItemMediaProps {
  imgIsLoading: Boolean;
  image: string;
  id: string;
}

const ServiceItemMedia: React.FC<IServiceItemMediaProps> = observer(({ ...props }) => {

  const { imgIsLoading, image, id } = props;

  if (imgIsLoading) return <Skeleton variant="rectangular" animation="wave" width='100%' height={194} />

  return (
    <Link to={`../card-detail/${id}`}>
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="manicure"
        sx={style}
      />
    </Link>
  )
})


export default ServiceItemMedia;