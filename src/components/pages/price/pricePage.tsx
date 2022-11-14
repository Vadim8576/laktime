import React, { useEffect } from 'react'
import { PagesTitle } from '../../widgets/pagesTitle'
import { observer } from 'mobx-react-lite';
import priceStore from "../../../store/priceStore";
import { Spiner } from '../../ui/spiner';
import Prices from './prices';


const PricePage = observer(() => {

  const { priceIsLoading, getPrices } = priceStore;

  useEffect(() => {
    console.log('useEffect price')
    getPrices();
  }, [])

  return (
    <>
      <PagesTitle title={'Услуги и цены'} />
      <Prices />
      <Spiner open={priceIsLoading} />
    </>
  )
})

export default PricePage;




