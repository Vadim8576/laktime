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
      <PagesTitle title={'Портфолио'} />
      <Portfolio />
      <Spiner open={portfolioIsLoading} />
    </>
  )
})


export default PortfolioPage;