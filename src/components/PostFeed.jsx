// src/components/PostFeed.jsx
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Container } from '@mui/material';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const postsArray = querySnapshot.docs.map((doc) => doc.data());
        setPosts(postsArray);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post, index) => (
          <Container key={index} className="post-card">
            <p>{post.content}</p>
            <small>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
          </Container>
        ))
      )}
    </Container>
  );
};

export default PostFeed;
