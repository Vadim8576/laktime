import React from "react";
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from "./privateRoute";
import { Container } from '@mui/material';
import Loading2 from "../ui/loading2";

const About = React.lazy(() => import('../pages/about/aboutPage'));
const Privacy = React.lazy(() => import('../pages/privacy/privacy'));
const Login = React.lazy(() => import('../pages/login/loginPage'));
const Price = React.lazy(() => import('../pages/price/pricePage'));
const Portfolio = React.lazy(() => import('../pages/portfolio/portfolioPage'));

const AppRoutes = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        marginBottom: 10,
        position: 'relative',
        marginTop: '102px'
      }}
    >
      <Routes>
        <Route
          path='/'
          element={
            <React.Suspense fallback={<Loading2 />}>
              <About />
            </React.Suspense>
          }
        />
        <Route
          path='privacy'
          element={
            <React.Suspense fallback={<Loading2 />}>
              <Privacy />
            </React.Suspense>
          }
        />
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
    </Routes>
    </Container >
  )
}

export default AppRoutes;




