// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import CreatePostForm from '../components/CreatePostForm';
import PostFeed from '../components/PostFeed';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

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
        <p>Please log in to see your feed.</p>
      )}
    </div>
  );
};

export default Home;
