import { Navigate, Route, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let isAuth = useContext(AuthContext);
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;