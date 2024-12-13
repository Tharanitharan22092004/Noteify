import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        toast.success(response.data.msg,{
          autoClose: 2000,
        });
        navigate("/login");
      }
      else {
        toast.error(response.data.msg || "Signup failed", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg || "An error occurred. Please try again.", {
          autoClose: 2000,
        });
      } else {
        toast.error("An unknown error occurred.", {
          autoClose: 2000,
        });
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font- bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter UserName"
              className="w-full px-3 py-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full px-3 py-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password "
              className="w-full px-3 py-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2"
            >
              Signup
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
