import React, {useEffect} from "react";
import { PriceCardItem } from "./priceCardItem";
import PriceCardItem2 from "./priceCardItem2";
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { IPriceList } from '../../../../store/priceStoreTypes';
import { observer } from 'mobx-react-lite';
import priceStore from "../../../../store/priceStore";
import { toJS } from "mobx";

interface IPriceListTypeGridProps {
  // priceList: IPriceList[]
}

export const PriceGrid: React.FC<IPriceListTypeGridProps> = observer(() => {
  
  let priceList = priceStore.sortPrice;

  if(!priceList.length) return <NoPriceList />

  return (
    <Container>
      <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} mt={0}>
        {priceList.map((price: IPriceList) => (
          <Grid item xs={12} sm={4} md={4} key={price.id}>
            <PriceCardItem2 key={price.id} price={price} />
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