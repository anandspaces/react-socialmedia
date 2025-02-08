import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase'; 
import { signOut, signInWithPopup } from 'firebase/auth'; 
import CreatePostForm from '../components/CreatePostForm';
import PostFeed from '../components/PostFeed';
import { Avatar, Button, Container, Typography, Box } from '@mui/material';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <Container maxWidth="md" className="py-10">
      {/* Header Section */}
      <Box className="text-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-800">
          Welcome to Samazik Sandesh
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          {user ? `Hello, ${user.displayName || 'User'} 👋` : 'Please log in to see your feed.'}
        </Typography>
      </Box>

      {/* User Section */}
      <Box className="flex flex-col items-center justify-center gap-4">
        {user ? (
          <Box className="flex items-center gap-4">
            <Avatar src={user.photoURL} alt="User Avatar" className="w-12 h-12" />
            <Button 
              onClick={handleLogout} 
              variant="contained" 
              color="secondary"
              className="px-5 py-2"
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button 
            onClick={handleGoogleLogin} 
            variant="contained" 
            color="primary"
            className="px-5 py-2"
          >
            Login with Google
          </Button>
        )}
      </Box>

      {/* Post Section */}
      {user && (
        <Box className="mt-10">
          <CreatePostForm />
          <PostFeed />
        </Box>
      )}
    </Container>
  );
};

export default Home;
