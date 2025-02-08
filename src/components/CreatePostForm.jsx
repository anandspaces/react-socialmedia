import { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreatePostForm = () => {
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) {
      setError("Post content cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "posts"), {
        content: newPost,
        userId: auth.currentUser?.uid || "Anonymous",
        createdAt: serverTimestamp(),
        is_deleted: false,
      });
      setNewPost("");
    } catch (error) {
      console.error("Error creating post: ", error);
      setError("Failed to create post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePostSubmit}
      className="w-full max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col gap-4 mt-6 transition-all duration-300"
    >
      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
        Share Your Thoughts
      </h2>

      {/* Text Input */}
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="What's on your mind?"
        rows={3}
        maxLength={500}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white transition"
      ></textarea>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <span className="text-gray-500 dark:text-gray-400 text-sm">{newPost.length}/500</span>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition flex items-center gap-2"
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin" />
              Posting...
            </>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
