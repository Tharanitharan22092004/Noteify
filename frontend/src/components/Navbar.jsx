import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logic to clear user session (e.g., token removal)
        localStorage.removeItem('userToken'); // Adjust this key based on your storage approach
        alert('You have been logged out.');
        navigate('/login'); // Redirect to the login page
    };

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <div className="text-xl font-bold">
                <Link to="/">Noteify</Link>
            </div>
            <input
                type="text"
                placeholder="Search notes..."
                className="bg-gray-600 px-4 py-2 rounded"
            />
            <div className="flex items-center">
                <span className="mr-4">User name</span>
                <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
                    Login
                </Link>
                <Link to="/signup" className="bg-green-500 px-4 py-2 rounded mr-4">
                    Signup
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
