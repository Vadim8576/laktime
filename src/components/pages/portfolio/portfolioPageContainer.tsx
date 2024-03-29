import React, { useEffect } from "react";
import { PagesTitle } from '../../widgets/pagesTitle';
import portfolioStore from "../../../store/portfolioStore";
import { Spiner } from '../../ui/spiner';
import Portfolio from './portfolioPage';
import { observer } from "mobx-react-lite";
import { FullScreenTitle } from "../../widgets/fullScreenTittle";
import { Button } from "@mui/material";


const PortfolioPage = observer(() => {
  console.log('PortfolioPage')

  const { portfolioIsLoading, getImages } = portfolioStore;

  useEffect(() => {
    console.log('useEffect getImages')
    getImages();

  }, [])


  

  return (
    <>
      <Spiner open={portfolioIsLoading} />
      {/* <PagesTitle title={'Портфолио'} /> */}
      <FullScreenTitle title={'Портфолио'} />
      <Portfolio />
    </>
  )
})


export default PortfolioPage;



