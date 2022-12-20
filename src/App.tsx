import React, { useEffect } from 'react';
import Header from './components/header/header';
import authStore from './store/authStore';
import { observer } from 'mobx-react-lite';
import { withCustomTheme } from './hoc/withCustomTheme';
import Footer from './components/footer/footer';
import AppRoutes from './components/routes/appRoutes';
import ConfirmDialog from './components/ui/confirmDialog';
import ShowMessage from './components/popupMessages/showMessage';

const App = observer(() => {

  const { login, authError } = authStore;

  useEffect(() => {
    const payload = {
      email: 'admin101@mail.ru',
      password: '123'
    }
    login(payload);
    // console.log('useEffect login')
  }, [])


  return (
    <div className="App">
      <Header />
      <ShowMessage
        error={authError}
        success={false}
      />
      <AppRoutes />
      <ConfirmDialog />
      <Footer />
    </div>
  )
})

export default withCustomTheme(App);


