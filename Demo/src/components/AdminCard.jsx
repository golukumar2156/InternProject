import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminCard() {

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // call admin protected API
  const handleAdminApi = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5008/api/admin",
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p className="text-gray-700">
              Add, remove or update user accounts easily.
            </p>
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">View Reports</h2>
            <p className="text-gray-700">
              Analyze system reports and user activity.
            </p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p className="text-gray-700">
              Configure system settings and preferences.
            </p>
          </div>

          <div className="bg-purple-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <p className="text-gray-700">
              View alerts and system notifications.
            </p>
          </div>

        </div>

        {/* Button to call Admin API */}
        <div className="mt-8 text-center">

          <button
            onClick={handleAdminApi}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Call Admin API
          </button>

          {/* response show */}
          {message && (
            <p className="mt-4 text-lg font-semibold text-green-600">
              {message}
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminCard;
