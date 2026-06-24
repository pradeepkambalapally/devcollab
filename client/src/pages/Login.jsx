import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLogIn } from "react-icons/fi";

import api from "../api/api.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      login(response.data.user, response.data.token);

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg">
            DC
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-zinc-400 mt-2">
            Sign in to continue to DevCollab
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30"
          >
            <FiLogIn />

            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm text-zinc-400 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;