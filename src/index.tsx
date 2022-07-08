import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { AuthContext } from './context/authContext';
import authStore from './store/authStore';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContext.Provider value={authStore.isAuth}>
       <App />
    </AuthContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);


