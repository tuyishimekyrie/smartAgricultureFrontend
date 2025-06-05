import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { LuCrop, LuRuler } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import image from "../../../assets/image.png";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axiosInstance";
import { Toaster, toast } from "sonner";
import InputField from "@/components/auth/InputField";
import PasswordField from "@/components/auth/PasswordField";
interface registerForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  plot_number: string;
  plot_size: string;
  primaryCrop: string;
  address: string;
  national_id: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const { register, handleSubmit } = useForm<registerForm>();

  const onSubmit = (data: registerForm) => {
    const formData = new FormData();
    formData.append("username", data.firstName);
    formData.append("role", "RESEARCHER");
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("plot_number", data.plot_number);
    formData.append("plot_size", data.plot_size);
    formData.append("primaryCrop", data.primaryCrop);
    formData.append("address", data.address);
    formData.append("national_id", data.national_id);

    api
      .post("api/auth/register", formData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        toast.success("Registration successful! Please log in.");

        setTimeout(() => {
          navigate("/auth/login");
        },2000)
      })
      .catch((error) => {
        console.error("Registration error:", error);
        toast.error(
          `Registration failed: ${error.response?.data || error.message}`
        );
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNextStep = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePrevStep = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex h-screen font-plus overflow-hidden bg-gray-50">
      <Toaster />
      {/* Left side image */}
      <div className="w-1/2 bg-green-700 relative overflow-hidden max-lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 to-green-900/80 z-10"></div>
        <img
          src={image}
          alt="Smart Agriculture"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md text-center"
          >
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full inline-block mb-4">
              <FaLeaf className="text-4xl text-green-300" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Join Our Smart Farming Community
            </h2>
            <p className="text-green-50 mb-6">
              Get access to cutting-edge agricultural sensors, real-time data
              analytics, and expert insights to optimize your farming
              operations.
            </p>
            <div className="flex justify-center space-x-2 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white/30"></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Registration form */}
      <div className="w-1/2 max-lg:w-full h-full overflow-y-auto py-8 px-4 sm:px-8 md:px-12">
        <div className="max-w-lg mx-auto">
          {/* Form header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Create Your Account
            </h1>
            <p className="text-gray-600 mt-2">
              Join our platform and unlock the power of precision farming
            </p>
          </motion.div>

          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2].map((step) => (
                <div key={step} className="flex-1 relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step <= currentStep
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    } mx-auto z-10 relative transition-all duration-300`}
                  >
                    {step}
                  </div>
                  <div className="text-xs text-center mt-1 font-medium">
                    {step === 1 ? "Personal Info" : "Farm Details"}
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`absolute top-4 left-0 right-0 h-0.5 -translate-y-1/2 ${
                        step < currentStep ? "bg-green-600" : "bg-gray-200"
                      } transition-all duration-300`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {/* <InputField 
                    label="Affiliation Number"
                    icon={<IoMdCard />}
                    placeholder="Enter affiliation number" required={false} type={""} other="affiliation-number"                 /> */}
                  <InputField
                    label="Email"
                    icon={<FaEnvelope />}
                    type="email"
                    placeholder="your.email@example.com"
                    required={false}
                    other="email"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    icon={<FaUser />}
                    placeholder="Enter your full name"
                    required={false}
                    type={""}
                    other="firstName"
                  />
                  <InputField
                    label="Last Name"
                    icon={<FaUser />}
                    placeholder="Enter your full name"
                    required={false}
                    type={""}
                    other="lastName"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    label="Phone Number"
                    icon={<FaPhone />}
                    placeholder="Enter phone number"
                    required={false}
                    type={""}
                    other="phone"
                  />
                  <InputField
                    label="ID Number"
                    icon={<IoMdCard />}
                    placeholder="Enter ID number"
                    required={false}
                    type={""}
                    other="national_id"
                  />
                </div>

                <InputField
                  label="Address"
                  icon={<FaMapMarkerAlt />}
                  placeholder="Enter your address"
                  required={false}
                  type={""}
                  other="address"
                />

                <motion.div variants={itemVariants} className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextStep}
                    className="w-full py-3 px-6 rounded-lg bg-green-600 text-white font-medium transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Continue to Farm Details
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    label="Plot Number"
                    icon={<LuCrop />}
                    placeholder="Enter plot number"
                    required={false}
                    type={""}
                    other="plot-number"
                  />
                  <InputField
                    label="Plot Size (hectares)"
                    icon={<LuRuler />}
                    placeholder="Enter plot size"
                    required={false}
                    type={""}
                    other="plot-size"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Primary Crop
                  </label>
                  <select
                    className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800"
                    {...register("primaryCrop")}
                  >
                    <option value="">Select primary crop</option>
                    <option value="corn">Corn</option>
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="beans">Beans</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <PasswordField
                  label="Password"
                  showPassword={showPassword}
                  toggleVisibility={togglePasswordVisibility}
                  placeholder="Create a strong password"
                  other="password"
                />

                <PasswordField
                  label="Confirm Password"
                  showPassword={showConfirmPassword}
                  toggleVisibility={toggleConfirmPasswordVisibility}
                  placeholder="Confirm your password"
                  other="confirm-password"
                />

                <motion.div
                  variants={itemVariants}
                  className="flex items-center"
                >
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-green-600 hover:text-green-800">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:text-green-800">
                      Privacy Policy
                    </a>
                  </label>
                </motion.div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrevStep}
                    className="flex-1 py-3 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-lg bg-green-600 text-white font-medium transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Create Account
                  </motion.button>
                </div>
              </motion.div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-green-600 font-medium hover:text-green-800 focus:outline-none"
                  onClick={() => navigate("/auth/login")}
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
