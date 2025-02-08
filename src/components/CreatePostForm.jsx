import { useState } from 'react';
import { db, auth } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';

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
        is_deleted: false,
      });
      setNewPost('');
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
      className="w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg flex flex-col gap-4 mt-6 transition-all duration-300"
    >
      {/* Heading */}
      <Typography variant="h6" className="text-gray-800 text-center font-semibold">
        Share Your Thoughts
      </Typography>

      {/* Text Input */}
      <TextField
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="What's on your mind?"
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        error={Boolean(error)}
        helperText={error}
        inputProps={{ maxLength: 500 }}
        className="transition-all duration-200"
      />

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Typography variant="caption" className="text-gray-500">
          {newPost.length}/500
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          className="transition-all duration-200"
        >
          {loading ? <CircularProgress size={20} className="text-white" /> : 'Post'}
        </Button>
      </div>
    </Box>
  );
};

export default CreatePostForm;
