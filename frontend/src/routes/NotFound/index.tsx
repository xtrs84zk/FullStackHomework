import { useEffect } from "react";
import { Container } from "./styles";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { REWARDS } from "../../constants";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => navigate(REWARDS, { replace: true }), 5000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return <Container>
    <Typography variant="h2">
      Not Found
    </Typography>
    <Typography variant="body1">
      You will be redirected to the rewards page in a few seconds.
    </Typography>
  </Container>;
};

export default NotFoundPage;