// src/components/CreatePostForm.jsx
import { useState } from 'react';
import { db, auth } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Button, TextField, Box, Typography } from '@mui/material';

const CreatePostForm = () => {
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'posts'), {
        content: newPost,
        userId: auth.currentUser?.uid || 'Anonymous',
        createdAt: serverTimestamp(),
      });
      setNewPost('');
      console.log(`Post created successfully: ${auth.currentUser?.uid}`);
    } catch (error) {
      console.error('Error creating post: ', error);
      setError('Failed to create post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handlePostSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Create a New Post
      </Typography>
      <TextField
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="What's on your mind?"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        error={Boolean(error)}
        helperText={error}
        aria-label="Post content"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ alignSelf: 'flex-end' }}
      >
        {loading ? 'Posting...' : 'Post'}
      </Button>
    </Box>
  );
};

export default CreatePostForm;
