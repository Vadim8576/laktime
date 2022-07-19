import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { PagesTitle } from '../../pagesTitle/pagesTitle'
import { ToggleButtons } from '../../ui/toggleButtons';
import { observer } from 'mobx-react-lite';
import priceStore from "../../../store/priceStore";
import { Spiner } from '../../ui/spiner';
import PriceForm from './priceForm';
import { PriceGrid } from "./priceGrid";
import ErrorMessage from '../../popupMessages/errorMessage';
import EditMenu from '../../ui/editMenu';
import SuccessMessage from '../../popupMessages/successMessage';



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

      {!priceIsLoading
        ?
        <Prices error={priceError} success={priceSuccess} />
        :
        <Spiner open={priceIsLoading} />
      }

    </Container>
  )
})

export default PricePage;




interface IPricesProps {
  error: string;
  success: boolean;
}

const Prices: React.FC<IPricesProps> = ({ error, success }) => {

  const [formOpen, setFormOpen] = React.useState<boolean>(false);

  return (
    <>
      <ErrorMessage error={error} />
      <SuccessMessage success={success} />
      <PriceGrid />
      <PriceForm formOpen={formOpen} setFormOpen={setFormOpen} />
      <EditMenu action={setFormOpen} />
    </>
  )
}


