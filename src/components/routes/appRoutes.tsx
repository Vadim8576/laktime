import React, { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from "./privateRoute";
import Loading2 from "../ui/loading2";
import { PagesTitle } from '../widgets/pagesTitle';
import { withPageContainer } from "../../hoc/withPageContainer";

const About = lazy(() => import('../pages/about/aboutPage'));
const Privacy = lazy(() => import('../pages/privacy/privacy'));
const Login = lazy(() => import('../pages/login/loginPage'));
const Services = lazy(() => import('../pages/services/servicesListPage/servicesPageContainer'));
const CardDetail = lazy(() => import('../pages/services/detailsPage/serviceDetails'));
const Portfolio = lazy(() => import('../pages/portfolio/portfolioPageContainer'));

const AppRoutes = () => {
  return (
    <>
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
          path='services'
          element={
            <Suspense fallback={<Loading2 />}>
              <Services />
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
          path='services'
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <Services />
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
    </>
  )
}

export default withPageContainer(AppRoutes);




