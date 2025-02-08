import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../firebase";
import { signOut, signInWithPopup } from "firebase/auth";
import CreatePostForm from "../components/CreatePostForm";
import PostFeed from "../components/PostFeed";
import Header from "../components/Header";
import { AiOutlineGoogle, AiOutlineLogout } from "react-icons/ai";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Samazik Sandesh
          </h1>
          <p className="text-gray-600">
            {user ? `Hello, ${user.displayName || "User"} 👋` : "Please log in to see your feed."}
          </p>
        </div>

        {/* User Authentication Section */}
        <div className="flex flex-col items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-600 transition"
              >
                <AiOutlineLogout className="text-xl" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            >
              <AiOutlineGoogle className="text-xl" />
              Login with Google
            </button>
          )}
        </div>

        {/* Post Section */}
        {user && (
          <div className="mt-10">
            <CreatePostForm />
            <PostFeed />
          </div>
        )}
      </div>
    </>
  );
}
