import React from 'react'
import { Container } from '@mui/material'
import { PagesTitle } from '../../pagesTitle/pagesTitle'
import PriceList from './priceList'

const pricePage: React.FC = () => {
  return (
    <>
      {/* <PageTitle title={'Услуги и цены'} /> */}

      <Container maxWidth='lg' sx={{
        background: '#fff',
        marginBottom: 10,
        position: 'relative',
        marginTop: '102px'
      }}>
        <PagesTitle title={'Услуги и цены'} />
        <PriceList />
      </Container>
    </>
  )
}

export default pricePage