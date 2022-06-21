import React from "react";
import { PriceCardItem } from "./priceCardItem";
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { IPriceList } from '../../../../store/priceStoreTypes';

interface IPriceListTypeGridProps {
  priceList: IPriceList[]
}

export const PriceGrid: React.FC<IPriceListTypeGridProps> = ({ priceList }) => {
  return (
    <Container>
      <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} mt={0}>
        {priceList.map((price: IPriceList) => (
          <Grid item xs={12} sm={4} md={4} key={price.id}>
            <PriceCardItem key={price.id} price={price} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}