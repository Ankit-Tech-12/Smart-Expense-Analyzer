import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api.js";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const data = await loginUser(formData);

      dispatch(login(data.data))

      // Login successful
      navigate("/");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1623] text-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💰</div>

          <h1 className="text-2xl font-bold text-white">
            Expense Analyzer
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Welcome back! Manage your expenses smarter.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#131c2e] border border-white/5 rounded-2xl shadow-xl shadow-black/20 p-5 sm:p-6">

          <h2 className="text-lg font-semibold text-gray-200 mb-1">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Login to continue to your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="
                  w-full
                  bg-[#0f1623]
                  border border-white/10
                  rounded-xl
                  px-4 py-3
                  text-sm text-gray-100
                  placeholder-gray-600
                  outline-none
                  focus:border-blue-500
                  transition
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="
                  w-full
                  bg-[#0f1623]
                  border border-white/10
                  rounded-xl
                  px-4 py-3
                  text-sm text-gray-100
                  placeholder-gray-600
                  outline-none
                  focus:border-blue-500
                  transition
                "
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-500
                disabled:bg-blue-600/50
                disabled:cursor-not-allowed
                text-white
                font-medium
                rounded-xl
                py-3
                transition
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;