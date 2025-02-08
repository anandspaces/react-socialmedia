import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Container, CircularProgress, Paper, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton } from '@mui/material';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

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

  const handleDelete = async () => {
    try {
      const postRef = doc(db, "posts", selectedPostId);
      await updateDoc(postRef, { is_deleted: true });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPostId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Container maxWidth="md" className="mt-6 px-4 sm:px-6 lg:px-8">
      {/* Loading State */}
      {loading && (
        <Box className="flex flex-col gap-4">
          {[1, 2, 3].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={100} animation="wave" className="rounded-lg" />
          ))}
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      )}

      {/* No Posts Message */}
      {!loading && posts.length === 0 && (
        <Typography variant="body1" align="center" className="text-gray-500">
          No posts available.
        </Typography>
      )}

      {/* Post List */}
      {!loading &&
        posts.map((post) => (
          <Paper
            key={post.id}
            elevation={3}
            className="p-4 mb-4 rounded-lg transition-all duration-300 bg-white shadow-md hover:shadow-lg"
          >
            <Typography variant="h6" className="font-semibold text-gray-900">
              {post.title || 'Untitled Post'}
            </Typography>
            <Typography variant="body1" className="mt-1 text-gray-700">
              {post.content}
            </Typography>

            {/* Author & Timestamp */}
            <Typography variant="subtitle2" className="text-gray-500 mt-2">
              Posted by: {post.author || 'Anonymous'} •{' '}
              {post.createdAt?.seconds
                ? new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(post.createdAt.seconds * 1000))
                : 'Unknown Date'}
            </Typography>

            {/* Delete Button */}
            <Box className="flex justify-end mt-3">
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => {
                  setSelectedPostId(post.id);
                  setDeleteDialogOpen(true);
                }}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PostFeed;
