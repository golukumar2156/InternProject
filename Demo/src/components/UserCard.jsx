import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserCard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // call User API
  const handleUserApi = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5008/api/user",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      setMessage(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Access Denied or Error");
    }
  };

  // call Public API
  const handlePublicApi = async () => {
    try {
      const res = await axios.get("http://localhost:5008/api/public");
      setMessage(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Error calling public API");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2">View Profile</h2>
            <p className="text-gray-700">
              Check your profile information and account details.
            </p>
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Update Details</h2>
            <p className="text-gray-700">
              Edit personal details like name, email, and password.
            </p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p className="text-gray-700">
              Change account preferences and notification settings.
            </p>
          </div>

          <div className="bg-purple-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Help & Support</h2>
            <p className="text-gray-700">
              Get help or contact support for any issues.
            </p>
          </div>

        </div>

        {/* API Buttons */}
        <div className="mt-8 text-center space-y-4">
          <button
            onClick={handlePublicApi}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow"
          >
            Call Public API
          </button>

          <button
            onClick={handleUserApi}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow"
          >
            Call User API
          </button>

          {message && (
            <p className="mt-4 text-lg font-semibold text-blue-600">
              {message}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default UserCard;
