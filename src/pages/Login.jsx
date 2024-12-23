// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button, Container } from '@mui/material';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      // On successful login, navigate to the home page
      navigate('/home');
    } catch (error) {
      setError(error.message);
      console.error('Error during Google login:', error);
    }
  };

  return (
    <Container>
      <h1>Login to Social Media</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={handleGoogleLogin}>Login with Google</Button>
    </Container>
  );
};

export default Login;
