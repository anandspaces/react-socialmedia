// src/components/CreatePostForm.jsx
import { useState } from 'react';
import { db, auth } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Button } from '@mui/material';

const CreatePostForm = () => {
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await addDoc(collection(db, 'posts'), {
        content: newPost,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setNewPost('');
      console.log(`Post created successfully: ${auth.currentUser.uid}`)
    } catch (error) {
      console.error('Error creating post: ', error);
    }
  };

  return (
    <form onSubmit={handlePostSubmit} className="create-post-form">
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="What's on your mind?"
        rows="4"
        cols="50"
      />
      <Button type="submit">Post</Button>
    </form>
  );
};

export default CreatePostForm;
