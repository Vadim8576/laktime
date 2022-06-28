import React, { useEffect } from 'react';
import Header from './components/header/header';
import { AuthContext } from './context/authContext';
import priceStore from './store/priceStore';
import authStore from './store/authStore';
import { observer } from 'mobx-react-lite';
import { CssBaseline } from '@mui/material';
import { withCustomTheme } from './hoc/withCustomTheme'
import Footer from './components/footer/footer';
import AppRoutes from './components/routes/appRoutes';




const App = observer((): JSX.Element => {

  useEffect(() => {
    authStore.login();
    console.log('useEffect login')
  }, [])

  useEffect(() => {
    console.log('useEffect price')
    priceStore.getPrices();
  }, [])

  return (
    <>
      <div
        className="App"
        style={{
          width: '100vw',
          height: '100vh',
          overflowX: 'hidden'
        }}
      >
        <AuthContext.Provider value={authStore.isAuth}>
          <Header />     
          <AppRoutes />
          <Footer />
        </AuthContext.Provider>
      </div>
    </>  
  )
})

export default withCustomTheme(App);


