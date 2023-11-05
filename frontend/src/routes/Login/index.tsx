import React from "react";
import { useAuth } from "../../context/auth";
import { Navigate } from "react-router-dom";
import { REWARDS } from "../../constants";

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  if (isAuthenticated) {
    return <div>
      <h1>Already logged in</h1>
      <p>Redirecting...</p>
      <Navigate to={REWARDS} replace={true} />
    </div>;
  }
  return <div>Login Page</div>;
};

export default LoginPage;