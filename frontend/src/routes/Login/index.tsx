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
  return <div>
    <h1>Login Page</h1>
    <button onClick={() => login("fake-token")}>Login</button>
  </div>;
};

export default LoginPage;