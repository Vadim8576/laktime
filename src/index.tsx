import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App';
import ScrollToTop from './components/ui/scrollTop';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
);


