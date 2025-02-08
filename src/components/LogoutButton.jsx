import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { AiOutlineLoading3Quarters, AiOutlineLogout } from "react-icons/ai";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all"
      >
        <AiOutlineLogout className="text-lg" />
        Logout
      </button>

      {/* Logout Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 max-w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Confirm Logout</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Are you sure you want to log out?</p>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg transition hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition"
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
