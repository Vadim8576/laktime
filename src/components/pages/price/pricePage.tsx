import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { PagesTitle } from '../../pagesTitle/pagesTitle'
import { observer } from 'mobx-react-lite';
import priceStore from "../../../store/priceStore";
import { Spiner } from '../../ui/spiner';

import Prices from './prices';



const PricePage: React.FC = observer(() => {

  const { priceIsLoading, getPrices, priceError, priceSuccess } = priceStore;

  useEffect(() => {
    console.log('useEffect price')
    getPrices();
  }, [])


  return (
    <Container maxWidth='lg' sx={{
      // background: '#fff',
      marginBottom: 10,
      position: 'relative',
      marginTop: '102px'
    }}>
      
    <PagesTitle title={'Услуги и цены'} />

    <Prices />
    {priceIsLoading &&
      <Spiner open={priceIsLoading} />
    }


    </Container>
  )
})

export default PricePage;




