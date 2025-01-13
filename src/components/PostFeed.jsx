// src/components/PostFeed.jsx
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Container, CircularProgress, Paper, Typography, Box } from '@mui/material';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // handle delete used
  const handleDelete = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, { is_deleted: true });
      console.log(`Post deleted successfully: ${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      {posts.length === 0 ? (
        <Typography variant="body1" align="center">
          No posts available.
        </Typography>
      ) : (
        posts.map((post) => (
          <Paper
            key={post.id}
            elevation={3}
            sx={{
              padding: 2,
              marginBottom: 2,
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {post.title || ''}
            </Typography>
            <Typography variant="body1">{post.content}</Typography>
            {post.author && (
              <Typography variant="subtitle2" color="text.secondary">
                Posted by: {post.author}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date(post.createdAt.seconds * 1000))}
            </Typography>
            <button onClick={() => handleDelete(post.id)} style={{ color: 'red' }}>
              Delete
            </button>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default PostFeed;
