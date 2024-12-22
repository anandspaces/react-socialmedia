import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase'; // Import googleAuthProvider from firebase.js
import { signOut, signInWithPopup } from 'firebase/auth'; // Import Firebase Auth methods
import CreatePostForm from '../components/CreatePostForm';
import PostFeed from '../components/PostFeed';
import LogoutButton from '../components/LogoutButton'; // Reusable LogoutButton component

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
    <div className="home">
      <h1>Welcome to Social Media</h1>
      {user ? (
        <div>
          <h2>Hello, {user.displayName || 'User'}</h2>
          <LogoutButton onClick={handleLogout} /> {/* Use reusable LogoutButton */}
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
