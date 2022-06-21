import React from 'react'
import { Container } from '@mui/material'
import { PagesTitle } from '../../pagesTitle/pagesTitle'
import { ToggleButtons } from '../../ui/toggleButtons';
import Prices from './prices';
import { observer } from 'mobx-react-lite';
import priceStore from "../../../store/priceStore";
import { Spiner } from '../../ui/spiner';



const PricePage: React.FC = observer(() => {
  const {priceIsLoading, priceList, priceError} = priceStore.getPriceStore();
  const [view, setView] = React.useState('module');

  const toggleButtonChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <>
      <Container maxWidth='lg' sx={{
        background: '#fff',
        marginBottom: 10,
        position: 'relative',
        marginTop: '102px'
      }}>
        <PagesTitle title={'Услуги и цены'} />
        <ToggleButtons view={view} toggleButtonChange={toggleButtonChange} />

        {!priceIsLoading 
          ?
          <Prices view={view} priceList={priceList} />
          :
          <Spiner open={priceIsLoading} />
        }
      </Container>
    </>
  )
})

export default PricePage;