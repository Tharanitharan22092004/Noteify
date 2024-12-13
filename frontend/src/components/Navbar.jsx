import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-300 p-4 text-white flex justify-between items-center">
      <h2 className="text-3xl font-medium text  text-blue-700 py-4">Note  
      <span className='text-3xl font-medium text-orange-600 py-4'>-ify</span></h2>
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-100 px-4 py-2 rounded text-black"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex items-center">
        {user ? (
          <>
            <span className="mr-4 text-black text-xl">{user.name || "User"}</span>
            <button
              onClick={() => logout(navigate)}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 px-4 py-2 rounded mr-4"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
