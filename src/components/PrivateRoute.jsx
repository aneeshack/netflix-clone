import { useAuth } from '../context/AuthProvider'; // Adjust the path as necessary
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
