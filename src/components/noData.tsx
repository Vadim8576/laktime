import React from 'react';
import { Container, Typography } from '@mui/material';

interface INoDataProps  {
  text: String;
}

const NoData: React.FC<INoDataProps> = ( {...props} ) => {
  const {text} = props;
  return (
    <Container>
      <Typography>{text}</Typography>
    </Container>
  )
}

export default NoData;