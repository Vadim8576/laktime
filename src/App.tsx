import React, { useEffect } from 'react';
import Header from './components/header/header';
import priceStore from './store/priceStore';
import authStore from './store/authStore';
import { observer } from 'mobx-react-lite';
import { CssBaseline } from '@mui/material';
import { withCustomTheme } from './hoc/withCustomTheme'
import Footer from './components/footer/footer';
import AppRoutes from './components/routes/appRoutes';
import ConfirmDialog from './components/ui/confirmDialog';




const App = observer(() => {

  useEffect(() => {
    authStore.login();
    console.log('useEffect login')
  }, [])


  return (
    <div className="App">
      <Header />
      <AppRoutes />
      <ConfirmDialog />
      {/* <Footer /> */}
    </div>
  )
})

export default withCustomTheme(App);


