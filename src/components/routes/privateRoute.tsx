import { Navigate, useLocation } from 'react-router-dom';
import authStore from '../../store/authStore';


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let {isAuth} = authStore;
  let location = useLocation();
  return isAuth ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;