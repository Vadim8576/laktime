import React, {useEffect} from "react";
import PriceCard from "./priceCard";
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import priceStore from "../../../store/priceStore";
import { MenuActionType } from './prices';
import { IPriceList } from '../../../store/storeTypes';
import NoData from "../../noData";



interface IPriceGridProps {
  setFormOpen: (formOpen: boolean) => void;
  setMenuActionType: (actionType: MenuActionType) => void;
}


const PriceGrid: React.FC<IPriceGridProps> = observer(
  ({ setFormOpen, setMenuActionType }) => {
  
  const {sortPrice, priceListLength} = priceStore;

  if(!priceListLength) return <NoData text={'Нет доступных услуг'} />

  return (
    <Container  sx={{ height: '100%' }}>
      <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} mt={0}>
        {sortPrice.map((priceList: IPriceList) => (
          <Grid item xs={12} sm={4} md={4} key={priceList.id}>
            <PriceCard
              key={priceList.id}
              priceList={priceList}
              setMenuActionType={setMenuActionType}
              setFormOpen={setFormOpen}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
})

export default PriceGrid;
