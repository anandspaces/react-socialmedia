import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { AiOutlineDelete } from "react-icons/ai";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
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
    <div className="max-w-3xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="w-full h-24 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}

      {/* No Posts Message */}
      {!loading && posts.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No posts available.</p>
      )}

      {/* Post List */}
      {!loading &&
        posts.map((post) => (
          <div
            key={post.id}
            className="p-4 mb-4 bg-white dark:bg-gray-900 shadow-md rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {post.title || "Untitled Post"}
            </h3>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              {post.content}
            </p>

            {/* Author & Timestamp */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Posted by: {post.author || "Anonymous"} •{" "}
              {post.createdAt?.seconds
                ? new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(post.createdAt.seconds * 1000))
                : "Unknown Date"}
            </p>

            {/* Delete Button */}
            <div className="flex justify-end mt-3">
              <button
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                onClick={() => {
                  setSelectedPostId(post.id);
                  setDeleteDialogOpen(true);
                }}
              >
                <AiOutlineDelete className="text-lg" />
                Delete
              </button>
            </div>
          </div>
        ))}

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 max-w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Confirm Deletion</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg transition hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
