import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaLeaf, FaEnvelope, FaLock } from "react-icons/fa";
import image from "../../../assets/image.png";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
// import { toast, Toaster } from "sonner";
import {ToastContainer,toast} from "react-toastify";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

export interface DecodedToken {
  email: string;
  exp: number;
  iat: number;
  id: number;
  password: string;
  role: string;
  sub: string;
}

const API_URL = import.meta.env.VITE_api_url;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormData) => {
    console.log("Form submitted with data:", data);
    setLoading(true);
    await axios
      .post(`${API_URL}/api/auth/login`, data)
      .then((response) => {
        if (response.data.status === "success") {
          console.log("Login successful:", response.data);
          toast.success("Login successful!");

          const token = response.data.data.token;
          console.log("Token received:", token);
          localStorage.setItem("token", token);

          const decode = jwtDecode<DecodedToken>(token);
          console.log("decoded", decode);

          if (decode.role === "ADMIN") navigate("/admin");
          else navigate("/client");
        } else {
          console.error("Login failed:", response.data.message);
          toast.error(
            response.data.message || "Login failed. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.error("Login failed. Please check your credentials.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex h-screen font-plus bg-gray-50">
      {/* <Toaster /> */}
      <ToastContainer/>
      {/* Left side - Image with overlay */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 relative overflow-hidden max-md:hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 to-green-800/40 z-10"></div>
        <img
          src={image}
          alt="Smart Agriculture"
          className="h-full w-full object-cover"
        />

        {/* Content overlay on image */}
        <div className="absolute inset-0 flex flex-col justify-center z-20 px-12 text-white">
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex items-center space-x-3 mb-8"
            >
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                <FaLeaf className="text-2xl text-green-300" />
              </div>
              <h2 className="text-2xl font-bold">AgriSmart</h2>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Welcome Back to Smart Agriculture
            </motion.h1>

            <motion.p
              className="text-white/80 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              Access your dashboard to monitor and optimize your farm's
              performance with real-time data.
            </motion.p>

            <motion.div
              className="mt-8 grid grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-medium">Real-time</h3>
                <p className="text-sm text-white/70">Sensor Data</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-medium">Smart</h3>
                <p className="text-sm text-white/70">Analytics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-medium">Precision</h3>
                <p className="text-sm text-white/70">Farming</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right side - Login form */}
      <div className="w-1/2 max-md:w-full h-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-600 mt-2">
              Access your smart agriculture dashboard
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaEnvelope />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/auth/forgot")}
                  className="text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaLock />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div> */}

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                {loading ? "submitting..." : "Sign in"}
              </motion.button>

              {/* <div className="flex items-center">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">or continue with</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div> */}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                onClick={() => navigate("/")}
              >
                <span>Go back to home</span>
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/auth/register")}
                className="font-medium text-green-600 hover:text-green-500 focus:outline-none"
              >
                Create an account
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
