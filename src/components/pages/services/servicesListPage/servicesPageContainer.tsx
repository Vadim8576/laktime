import React, { useEffect } from 'react'
import { PagesTitle } from '../../../widgets/pagesTitle'
import { observer } from 'mobx-react-lite';
import servicesStore from "../../../../store/servicesStore";
import { Spiner } from '../../../ui/spiner';
import ServicesPage from './servicesPage';
import { FullScreenTitle } from '../../../widgets/fullScreenTittle';



const ServicesPageContainer = observer(() => {

  const { servicesIsLoading, getServices } = servicesStore;

  useEffect(() => {
    console.log('useEffect service')
    getServices();
  }, [])

  return (
    <>
      {/* <PagesTitle title={'Услуги и цены'} /> */}
      <FullScreenTitle title={'Услуги и цены'} />
      <ServicesPage />
      <Spiner open={servicesIsLoading} />
    </>
  )
})


export default ServicesPageContainer;




