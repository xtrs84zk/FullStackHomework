import { useCallback, useState } from "react";
import { useAuth } from "../../context/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { REWARDS } from "../../constants";
import { Container } from "./styles";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = useCallback(async (username: string) => {
    await login(username);
    toast.success(`Welcome ${username}!`);
    navigate(REWARDS, { replace: true });
  }, [navigate, login]);

  if (isAuthenticated) {
    return <Container>
      <Typography variant="h4">Already logged in</Typography>
      <Typography variant="body1">Redirecting...</Typography>
      <Navigate to={REWARDS} replace={true} />
    </Container>;
  }
  return <Container>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      noValidate
    >
      <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" />
      <Button variant="contained" onClick={() => onLogin(username)}>Login</Button>
    </Box>
  </Container>;
};

export default LoginPage;