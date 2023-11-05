import React from "react";
import { useAuth } from "../../context/auth";
import { Navigate } from "react-router-dom";
import { REWARDS } from "../../constants";
import { Container } from "./styles";
import { Button, Typography } from "@mui/material";

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  if (isAuthenticated) {
    return <Container>
      <Typography variant="h4">Already logged in</Typography>
      <Typography variant="body1">Redirecting...</Typography>
      <Navigate to={REWARDS} replace={true} />
    </Container>;
  }
  return <Container>
    <Typography variant="h2">Login Page</Typography>
    <Button variant="contained" onClick={() => login("fake-token")}>Login</Button>
  </Container>;
};

export default LoginPage;