// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const API_URL = 'http://localhost:4000/api/account/login';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(API_URL, {
        email,
        password,
      });
      console.log('API Response:', response.data); // Debugging
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      console.log('Full Error:', err.response); // Debugging
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="body1" gutterBottom>
            You are successfully logged in.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            type="email"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;