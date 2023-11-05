import { Navigate, Route, RouteProps, useNavigate } from "react-router-dom";
import { useAuth } from "../redux/auth";
import { ReactElement } from "react";
import { LOGIN } from "../constants";


const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // navigate('/login');
    return <Navigate to={LOGIN} />;
  }
  return children;
};

export default ProtectedRoute;