import React, { useEffect } from "react";
import { PagesTitle } from '../../pagesTitle/pagesTitle';
import portfolioStore from "../../../store/portfolioStore";
import { Spiner } from '../../ui/spiner';
import Portfolio from './portfolio';
import { observer } from "mobx-react-lite";


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
      <PagesTitle title={'Портфолио'} />
      <Portfolio />
    </>
  )
})


export default PortfolioPage;



