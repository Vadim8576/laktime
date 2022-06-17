import React, { useEffect } from 'react';
import PricePage from './components/pages/price/pricePage';
import Header from './components/header/header';
import { AuthContext } from '../src/context/context';
import priceStore from './store/priceStore';
import authStore from './store/authStore';
import { observer } from 'mobx-react-lite';
import { CssBaseline } from '@mui/material';
import { withCustomTheme } from './hoc/withCustomTheme'
import Footer from './components/footer/footer';


const App = observer(() => {

  useEffect(() => {
    authStore.login()
  }, [])

  useEffect(() => {
    priceStore.getPrices()
  }, [])

  return (
    <>
       <CssBaseline />
      <div className="App" style={{
        width: '100vw',
        height: '100vh',
        overflowX: 'hidden'
      }}>
        <AuthContext.Provider value={authStore?.isAuth}>
          <Header />
          <PricePage />
          {/* <Footer /> */}
        </AuthContext.Provider>
      </div>
    </>  
  )
})

export default withCustomTheme(App);


