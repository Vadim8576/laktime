import React, { useEffect, useState, useMemo, createRef, FC, MouseEvent } from "react";
import ServicesCard from "./serviceCard/card";
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import servicesStore from "../../../../../../store/servicesStore";
import { MenuActionType } from '../../servicesPage';
import { IServicesList } from '../../../../../../store/storeTypes';
import NoData from "../../../../../widgets/noData";
import styled from 'styled-components';


const Animate3dContainer = styled.div`
  transform-style: preserve-3d;
  perspective: 600px;
  transform: 'rotate3d(0, 0, 0, 0)',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, .3)'
`

interface IServicesGridProps {
  setFormOpen: (formOpen: boolean) => void;
  setMenuActionType: (actionType: MenuActionType) => void;
}

const ServicesGrid: FC<IServicesGridProps> = observer(({ ...props }) => {

  const { setFormOpen, setMenuActionType } = props;
  const { sortServices, servicesListLength } = servicesStore;
  if (!servicesListLength) return <NoData text={'Нет доступных услуг'} />

  return (
    <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} mt={0}>
      {sortServices.map((service: IServicesList) => (
        <Grid item xs={12} sm={4} md={4} key={service.id}>
            <ServicesCard
              service={service}
              setMenuActionType={setMenuActionType}
              setFormOpen={setFormOpen}
            />
        </Grid>
      ))}
    </Grid>
  )
})

export default ServicesGrid;
