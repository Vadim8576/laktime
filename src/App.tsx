import React, { useEffect, useState } from 'react';
import authAPI from './api/authAPI';
import pricesAPI from './api/priceAPI';
import PriceListPage from './components/pages/price/priceListPage';
import Header from './components/header/header';
import '@fontsource/roboto/400.css';
import { AuthContext } from '../src/context/context';
import priceStore from './store/priceStore';
import authStore from './store/authStore';
import { observer } from 'mobx-react-lite';



interface PriceList {
  id: number,
  service: string,
  price: string,
  active: boolean,
  description: string
}

interface IauthContext {
  auth: boolean
}


const App = observer(() => {

  useEffect(() => {
    authStore.login()
  }, [])

  useEffect(() => {
    priceStore.getPrices()    
  }, [])


  return (
    <div className="App" style={{
      width: '100vw',
      height: '100vh',
      overflowX: 'hidden'
    }}>
      <AuthContext.Provider value={authStore?.isAuth}>
        <Header />
        <PriceListPage />
      </AuthContext.Provider>
    </div>
  );
})

  

export default App;
