import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate("/home"); // Redirect after successful login
    } catch (error) {
      setError(error.message);
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Login to Samazik Sandesh
        </h2>

        {error && (
          <div className="mt-3 text-sm text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FcGoogle size={24} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
