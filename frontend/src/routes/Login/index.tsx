import { useCallback, useState } from "react";
import { useAuth } from "../../context/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { authenticate } from "../../api/auth";
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

  const onLogin = useCallback(async (username: string, password: string) => {
    try {
      const user = await authenticate(username, password);
      login(user);
      navigate(REWARDS, { replace: true });
      toast.success(`Welcome back ${user.name}`);
    } catch (err) {
      toast.error("Failed to login");
    }
  }, [login]);

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
      <Button variant="contained" onClick={() => onLogin(username, password)}>Login</Button>
    </Box>
  </Container>;
};

export default LoginPage;