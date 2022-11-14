import React, { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from "./privateRoute";
import { Container } from '@mui/material';
import Loading2 from "../ui/loading2";
import { PagesTitle } from '../widgets/pagesTitle';

const About = lazy(() => import('../pages/about/aboutPage'));
const Privacy = lazy(() => import('../pages/privacy/privacy'));
const Login = lazy(() => import('../pages/login/loginPage'));
const Price = lazy(() => import('../pages/price/pricePage'));
const CardDetail = lazy(() => import('../pages/price/cardDetail'));
const Portfolio = lazy(() => import('../pages/portfolio/portfolioPage'));

const AppRoutes = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        marginBottom: 10,
        position: 'relative',
        marginTop: '102px',
        minHeight: 'calc(100vh - 182px)'
      }}
    >
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<Loading2 />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path='privacy'
          element={
            <Suspense fallback={<Loading2 />}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path='login'
          element={
            <Suspense fallback={<Loading2 />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path='price'
          element={
            <Suspense fallback={<Loading2 />}>
              <Price />
            </Suspense>
          }
        />
        <Route
          path='card-detail/:id'
          element={
            <Suspense fallback={<Loading2 />}>
              <CardDetail />
            </Suspense>
          }
        />
        {/* <Route
          path='price'
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <Price />
              </Suspense>
            </PrivateRoute>

          }
        /> */}
        <Route
          path='portfolio'
          element={
            <Suspense fallback={<Loading2 />}>
              <Portfolio />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <PagesTitle title='Страница не найдена' />
          }
        />
    </Routes>
    </Container >
  )
}

export default AppRoutes;




