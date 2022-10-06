import React from "react";
import { Route, Routes } from 'react-router-dom';
import Login from '../login/login';
import PrivateRoute from "./privateRoute";
import Loading2 from "../ui/loading2";

const Price = React.lazy(() => import('../pages/price/pricePage'));
const Portfolio = React.lazy(() => import('../pages/portfolio/portfolioPage'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<h1 style={{ marginTop: '70px' }}>Главная страница</h1>} />
        <Route
          path='login'
          element={
            <React.Suspense fallback={<Loading2 />}>
              <Login />
            </React.Suspense>
          }
        />
        <Route
          path='price'
          element={
            <React.Suspense fallback={<Loading2 />}>
              <Price />
            </React.Suspense>
          }
        />
        {/* <Route
          path='price'
          element={
            <PrivateRoute>
              <React.Suspense fallback={<Loading />}>
                <Price />
              </React.Suspense>
            </PrivateRoute>

          }
        /> */}
        <Route
          path='portfolio'
          element={
            <React.Suspense fallback={<Loading2 />}>
              <Portfolio />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes;




