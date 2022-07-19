import React, {useEffect} from "react";
import PriceCard from "./priceCard";
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import priceStore from "../../../store/priceStore";
import { IPriceList } from '../../../store/priceStoreTypes';




export const PriceGrid = observer(() => {
  
  const {sortPrice, priceListLength} = priceStore;

  if(!priceListLength) return <NoPriceList />

  return (
    <Container>
      <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} mt={0}>
        {sortPrice.map((price: IPriceList) => (
          <Grid item xs={12} sm={4} md={4} key={price.id}>
            <PriceCard key={price.id} price={price} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
})

export default PriceGrid;



const NoPriceList = () => {
  return (
    <Container>
      <Typography>Услуги отсутствуют</Typography>
    </Container>
  )
}