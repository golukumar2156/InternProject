import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // form input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5008/api/public/login", form);

      const token = res.data.token; // backend JWT
      const role = res.data.role;   // backend role: ADMIN / USER

      // save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login Successful");

    // Redirect based on role
    if (role === "ROLE_ADMIN") {
      navigate("/admin");
    } else {
      navigate("/user");
    }

    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Don't have account?
          <Link to="/register" className="text-blue-500 ml-1">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
