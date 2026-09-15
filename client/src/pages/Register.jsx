import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Card from "../components/Card";
import Toast from "../components/Toast";
import { registerUser } from "../api/auth.api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser(formData);

      setShowToast(true);

      // Go to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1623] text-gray-100 flex items-center justify-center px-4 py-8">

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">
            💰
          </div>

          <h1 className="text-2xl font-bold text-white">
            Expense Analyzer
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Start managing your expenses smarter
          </p>
        </div>

        {/* Register Card */}
        <Card>

          <h2 className="text-lg font-semibold text-gray-200">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Enter your details to get started
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="
                  w-full
                  bg-[#0f1623]
                  border border-white/10
                  rounded-xl
                  px-4 py-3
                  text-sm
                  text-gray-100
                  placeholder-gray-600
                  outline-none
                  focus:border-blue-500
                  transition
                "
              />
            </div>

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
                  text-sm
                  text-gray-100
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
                placeholder="Create a password"
                required
                className="
                  w-full
                  bg-[#0f1623]
                  border border-white/10
                  rounded-xl
                  px-4 py-3
                  text-sm
                  text-gray-100
                  placeholder-gray-600
                  outline-none
                  focus:border-blue-500
                  transition
                "
              />
            </div>

            {/* Error */}
            {error && (
              <div className="
                bg-red-500/10
                border border-red-500/20
                text-red-400
                text-sm
                rounded-xl
                px-4 py-3
              ">
                {error}
              </div>
            )}

            {/* Submit */}
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}

            <Link
              to="/login"
              className="
                text-blue-400
                hover:text-blue-300
                font-medium
                transition
              "
            >
              Login
            </Link>
          </p>

        </Card>

      </motion.div>

      {/* Success Toast */}
      <Toast
        message="Account created successfully!"
        show={showToast}
      />

    </div>
  );
};

export default Register;