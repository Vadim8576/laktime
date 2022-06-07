import React, { useEffect, useState } from 'react';
import authAPI from './api/authAPI';
import pricesAPI from './api/priceAPI';
import PriceLists from './components/pages/price/pricePage';
import UserInfo from './components/userInfo';
import Header from './components/header/header';
import '@fontsource/roboto/400.css';
import { AuthContext } from '../src/context/context';

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


const App = () => {

  const [priceList, setPriceList] = useState([])
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')


  useEffect(() => {

    authAPI.login().then((response: any) => {
      const resp = response.data;
      console.log(resp)

      const token = resp.data.token
      const refreshToken = resp.data.refreshToken

      console.log('token: ', token)
      console.log('refreshToken: ', refreshToken)


      if (resp.ok) {
        setAuth(true);
      }
    }).catch((error: any) => {
      setAuth(false);
      setMessage(error.response.data.message)
    })

  }, [])

  useEffect(() => {
    pricesAPI.getPrices().then((response: { data: any; }) => setPriceList(response.data))
  }, [])

  return (
    <div className="App" style={{
      width: '100vw',
      height: '100vh',
      overflowX: 'hidden'
    }}>
      <AuthContext.Provider value={auth}>
        <Header />
        {/* <UserInfo message={message} /> */}
        <PriceLists priceList={priceList} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
