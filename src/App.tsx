import React, { useEffect } from 'react';
import Header from './components/header/header';
import authStore from './store/authStore';
import { observer } from 'mobx-react-lite';
import { withCustomTheme } from './hoc/withCustomTheme';
import Footer from './components/footer/footer';
import AppRoutes from './components/routes/appRoutes';
import ConfirmDialog from './components/ui/confirmDialog';
import ShowMessage from './components/popupMessages/showMessage';
import background from './images/female-hand-with-white-dandelion-nail-design.jpg';
import { PagesTitle } from './components/pagesTitle/pagesTitle';
import styled from "styled-components";
import { Container } from '@mui/material';


const App = observer(() => {

  const { login, authError } = authStore;

  useEffect(() => {
    // login();
    // console.log('useEffect login')
  }, [])


  return (
    <div className="App">
      <ShowMessage
        error={authError}
        success={false}
      />
      <Header />
      <AppRoutes />
      <ConfirmDialog />
      {/* <Footer /> */}

    </div>
  )
})

export default withCustomTheme(App);


