import React, { useEffect } from "react";
import { Container } from '@mui/material';
import { PagesTitle } from '../../pagesTitle/pagesTitle';
import portfolioStore from "../../../store/portfolioStore";
import { Spiner } from '../../ui/spiner';
import Portfolio from './portfolio';
import { observer } from "mobx-react-lite";


const PortfolioPage = observer(() => {

  const { portfolioIsLoading, getImages, portfolioError, portfolioSuccess } = portfolioStore;


  useEffect(() => {
    console.log('useEffect images')
    getImages();
  }, [])

  return (
    <Container maxWidth='lg' sx={{
      // background: '#fff',
      marginBottom: 10,
      position: 'relative',
      marginTop: '102px'
    }}>
      <PagesTitle title={'Портфолио'} />

      {!portfolioIsLoading
        ?
        <Portfolio error={portfolioError} success={portfolioSuccess} />
        :
        <Spiner open={portfolioIsLoading} />
      }

    </Container>
  )
})


export default PortfolioPage;