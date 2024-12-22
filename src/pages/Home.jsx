// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import CreatePostForm from '../components/CreatePostForm';
import PostFeed from '../components/PostFeed';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);  // Update the user state with the authenticated user
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div className="home">
      <h1>Welcome to Social Media</h1>
      {user ? (
        <div>
          <h2>Hello, {user.displayName || 'User'}</h2>
          <button onClick={handleLogout}>Logout</button>
          <CreatePostForm />
          <PostFeed />
        </div>
      ) : (
        <div>
          <p>Please log in to see your feed.</p>
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      )}
    </div>
  );
};

export default Home;
