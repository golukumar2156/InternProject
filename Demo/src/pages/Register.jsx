import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_USER", // default
  });

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5008/api/public/register",
        form
      );

      console.log(res.data);
      alert("Register Successful!");

      navigate("/"); // redirect to login

    } catch (error) {
      console.error(error);
      alert("Register Failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          {/* Role select dropdown */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Already have account?
          <Link to="/" className="text-blue-500 ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
