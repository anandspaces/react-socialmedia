import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button, Container, Typography, Box, Alert } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate('/home'); // Redirect after successful login
    } catch (error) {
      setError(error.message);
      console.error('Error during Google login:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="flex items-center justify-center min-h-screen">
      <Box className="w-full p-6 bg-white shadow-lg rounded-lg text-center">
        <Typography variant="h5" className="font-semibold text-gray-800">
          Login to Social Media
        </Typography>

        {error && (
          <Alert severity="error" className="mt-3">
            {error}
          </Alert>
        )}

        <Button
          onClick={handleGoogleLogin}
          variant="contained"
          fullWidth
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} />
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
