import React, { useEffect, useState, useMemo, createRef, FC, MouseEvent } from "react";
import ServicesItem from "./servicesList/servicesItem";
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import servicesStore from "../../../../../../store/servicesStore";
import { MenuActionType } from '../../servicesPage';
import { IServicesList } from '../../../../../../store/storeTypes';
import NoData from "../../../../../widgets/noData";
import styled from 'styled-components';

const servicesStyle = {
  width: '100%',
  minWidth: '360px',
  marginTop: '100px'
}

const Animate3dContainer = styled.div`
  transform-style: preserve-3d;
  perspective: 600px;
  transform: 'rotate3d(0, 0, 0, 0)',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, .3)'
`

interface IServiceGridProps {
  setFormOpen: (formOpen: boolean) => void;
  setMenuActionType: (actionType: MenuActionType) => void;
}

const ServicesGrid: FC<IServiceGridProps> = observer(({ ...props }) => {

  const { setFormOpen, setMenuActionType } = props;
  const { sortServices, servicesListLength } = servicesStore;
  if (!servicesListLength) return <NoData text={'Нет доступных услуг'} />

  return (
    <section style={servicesStyle}>
      {sortServices.map((service: IServicesList) => (
        <ServicesItem
          service={service}
          setFormOpen={setFormOpen}
          setMenuActionType={setMenuActionType}
          key={service.id}
        />
      ))}
    </section>
  )
})

export default ServicesGrid;
