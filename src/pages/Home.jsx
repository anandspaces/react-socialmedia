import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase'; // Import googleAuthProvider from firebase.js
import { signOut, signInWithPopup } from 'firebase/auth'; // Import Firebase Auth methods
import CreatePostForm from '../components/CreatePostForm';
import PostFeed from '../components/PostFeed';
import LogoutButton from '../components/LogoutButton'; // Reusable LogoutButton component
import { styled } from '@mui/material/styles';
import { Box, Container, Grid2, Paper } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider); // Sign in using Google popup
      setUser(result.user); // Set the user data
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <Container>
      <h1>Welcome to Samazik Sandesh</h1>
      {user ? (
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2} columns={16}>
              <Grid2 size={8}>
                <h2>Hello, {user.displayName || 'User'}</h2>
              </Grid2>
              <Grid2 size={8}>
                <Item><LogoutButton onClick={handleLogout} /> {/* Use reusable LogoutButton */}</Item>
              </Grid2>
            </Grid2>
          </Box>
          <CreatePostForm />
          <PostFeed />
        </Container>
      ) : (
        <Container>
          <p>Please log in to see your feed.</p>
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </Container>
      )}
    </Container>
  );
};

export default Home;
