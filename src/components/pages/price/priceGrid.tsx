import React, { useEffect, useState, useMemo, createRef, FC, MouseEvent } from "react";
import PriceCard from "./priceCard/priceCard";
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import priceStore from "../../../store/priceStore";
import { MenuActionType } from './prices';
import { IPriceList } from '../../../store/storeTypes';
import NoData from "../../widgets/noData";
import styled from 'styled-components';
import PerspectiveAnimation3d from "../../ui/perspectiveAnimation3d";


const Animate3dContainer = styled.div`
  transform-style: preserve-3d;
  perspective: 600px;
  transform: 'rotate3d(0, 0, 0, 0)',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, .3)'
`

interface IPriceGridProps {
  setFormOpen: (formOpen: boolean) => void;
  setMenuActionType: (actionType: MenuActionType) => void;
}

const PriceGrid: FC<IPriceGridProps> = observer(({ ...props }) => {

  const { setFormOpen, setMenuActionType } = props;
  const { sortPrice, priceListLength } = priceStore;
  if (!priceListLength) return <NoData text={'Нет доступных услуг'} />

  return (
    <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} mt={0}>
      {sortPrice.map((priceList: IPriceList) => (
        <Grid item xs={12} sm={4} md={4} key={priceList.id}>
            <PriceCard
              priceList={priceList}
              setMenuActionType={setMenuActionType}
              setFormOpen={setFormOpen}
            />
        </Grid>
      ))}
    </Grid>
  )
})

export default PriceGrid;
