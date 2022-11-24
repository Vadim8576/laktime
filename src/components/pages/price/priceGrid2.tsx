import React, { useEffect, useState, useMemo, createRef, FC, MouseEvent } from "react";
import PriceCard from "./priceCard/priceCard";
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import priceStore from "../../../store/priceStore";
import { MenuActionType } from './prices';
import { IPriceList } from '../../../store/storeTypes';
import NoData from "../../widgets/noData";
import styled from 'styled-components';
import css from './priceCard/priceCard2.module.css'
import PriceCard2 from "./priceCard/priceCard2";

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

const PriceGrid2: FC<IPriceGridProps> = observer(({ ...props }) => {

  const { setFormOpen, setMenuActionType } = props;
  const { sortPrice, priceListLength } = priceStore;
  if (!priceListLength) return <NoData text={'Нет доступных услуг'} />

  return (
    <section className={css.prices}>
      {sortPrice.map((priceList: IPriceList) => (
        <PriceCard2
          priceList={priceList}
          setMenuActionType={setMenuActionType}
          setFormOpen={setFormOpen}
          key={priceList.id}
        />
      ))}
    </section>
  )
})

export default PriceGrid2;
