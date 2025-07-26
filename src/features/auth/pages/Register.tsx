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

// Enhanced form interface with validation rules
interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  plot_number: string;
  plot_size: string;
  primaryCrop: string;
  address: string;
  national_id: string;
  terms: boolean;
}

// Validation rules
const validationRules = {
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: "First name can only contain letters",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: { value: 2, message: "Last name must be at least 2 characters" },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: "Last name can only contain letters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address",
    },
  },
  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^[+]?[0-9\s\-()]{10,15}$/,
      message: "Please enter a valid phone number",
    },
  },
  password: {
    required: "Password is required",
    minLength: { value: 8, message: "Password must be at least 8 characters" },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message:
        "Password must contain uppercase, lowercase, number and special character",
    },
  },
  national_id: {
    required: "National ID is required",
    pattern: {
      value: /^[0-9]+$/,
      message: "National ID must contain only numbers",
    },
  },
  plot_number: {
    required: "Plot number is required",
  },
  plot_size: {
    required: "Plot size is required",
    pattern: {
      value: /^\d+(\.\d+)?$/,
      message: "Plot size must be a valid number",
    },
  },
  primaryCrop: {
    required: "Primary crop selection is required",
  },
  address: {
    required: "Address is required",
    minLength: { value: 10, message: "Please provide a complete address" },
  },
  terms: {
    required: "You must agree to the terms and conditions",
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 2;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<RegisterForm>({
    mode: "onChange", // Real-time validation
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      plot_number: "",
      plot_size: "",
      primaryCrop: "",
      address: "",
      national_id: "",
      terms: false,
    },
  });

  // Watch password for confirmation validation
  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsSubmitting(true);

      // Clean and prepare data
      const cleanedData = {
        username:
          `${data.firstName.trim()}${data.lastName.trim()}`.toLowerCase(),
        role: "RESEARCHER",
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.replace(/\s|-|\(|\)/g, ""), // Remove formatting
        password: data.password,
        plot_number: data.plot_number.trim(),
        plot_size: parseFloat(data.plot_size).toString(), // Ensure numeric
        primaryCrop: data.primaryCrop,
        address: data.address.trim(),
        national_id: data.national_id.trim(),
      };

      // Send as JSON instead of FormData for better type safety
      const response = await api.post("api/auth/register", cleanedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);

      toast.success("Registration successful! Redirecting to login...");

      // Redirect after success
      setTimeout(() => {
        navigate("/auth/login", {
          state: {
            message:
              "Registration successful! Please log in with your credentials.",
          },
        });
      }, 2000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration error:", error);

      // Better error handling
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Enhanced step navigation with validation
  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate current step fields
    const step1Fields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "national_id",
      "address",
    ] as const;
    const isStep1Valid = await trigger(step1Fields);

    if (isStep1Valid) {
      setCurrentStep(2);
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  const handlePrevStep = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  // Animation variants
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
      <Toaster position="top-right" richColors />

      {/* Left side image - Enhanced with better content */}
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
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-full inline-block mb-6">
              <FaLeaf className="text-4xl text-green-300" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Join Our Smart Farming Community
            </h2>
            <p className="text-green-50 mb-6 leading-relaxed">
              Get access to cutting-edge agricultural sensors, real-time data
              analytics, and expert insights to optimize your farming
              operations.
            </p>

            {/* Feature highlights */}
            <div className="space-y-2 text-sm text-green-100">
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-green-300 rounded-full"></div>
                <span>Real-time crop monitoring</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-green-300 rounded-full"></div>
                <span>Weather predictions & alerts</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-green-300 rounded-full"></div>
                <span>Yield optimization insights</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Registration form - Enhanced with better UX */}
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
              Step {currentStep} of {totalSteps}:{" "}
              {currentStep === 1
                ? "Personal Information"
                : "Farm Details & Security"}
            </p>
          </motion.div>

          {/* Enhanced Progress steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2].map((step) => (
                <div key={step} className="flex-1 relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step < currentStep
                        ? "bg-green-600 text-white"
                        : step === currentStep
                        ? "bg-green-600 text-white ring-4 ring-green-200"
                        : "bg-gray-200 text-gray-500"
                    } mx-auto z-10 relative transition-all duration-300`}
                  >
                    {step < currentStep ? "✓" : step}
                  </div>
                  <div className="text-xs text-center mt-2 font-medium">
                    {step === 1 ? "Personal Info" : "Farm & Security"}
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-0.5 ${
                        step < currentStep ? "bg-green-600" : "bg-gray-200"
                      } transition-all duration-300`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form with enhanced validation */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {currentStep === 1 && (
              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <InputField
                      label="First Name"
                      icon={<FaUser />}
                      placeholder="Enter your first name"
                      required={true}
                      type="text"
                      other="firstName"
                      register={register(
                        "firstName",
                        validationRules.firstName
                      )}
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <InputField
                      label="Last Name"
                      icon={<FaUser />}
                      placeholder="Enter your last name"
                      required={true}
                      type="text"
                      other="lastName"
                      register={register("lastName", validationRules.lastName)}
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <InputField
                    label="Email Address"
                    icon={<FaEnvelope />}
                    type="email"
                    placeholder="your.email@example.com"
                    required={true}
                    other="email"
                    register={register("email", validationRules.email)}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <InputField
                      label="Phone Number"
                      icon={<FaPhone />}
                      placeholder="+250 xxx xxx xxx"
                      required={true}
                      type="tel"
                      other="phone"
                      register={register("phone", validationRules.phone)}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <InputField
                      label="National ID"
                      icon={<IoMdCard />}
                      placeholder="Enter your ID number"
                      required={true}
                      type="text"
                      other="national_id"
                      register={register(
                        "national_id",
                        validationRules.national_id
                      )}
                    />
                    {errors.national_id && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.national_id.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <InputField
                    label="Address"
                    icon={<FaMapMarkerAlt />}
                    placeholder="Enter your complete address"
                    required={true}
                    type="text"
                    other="address"
                    register={register("address", validationRules.address)}
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                <motion.div variants={itemVariants} className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextStep}
                    className="w-full py-3 px-6 rounded-lg bg-green-600 text-white font-medium transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Farm Details →
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <InputField
                      label="Plot Number"
                      icon={<LuCrop />}
                      placeholder="e.g., P-001"
                      required={true}
                      type="text"
                      other="plot_number"
                      register={register(
                        "plot_number",
                        validationRules.plot_number
                      )}
                    />
                    {errors.plot_number && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.plot_number.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <InputField
                      label="Plot Size (hectares)"
                      icon={<LuRuler />}
                      placeholder="e.g., 2.5"
                      required={true}
                      type="number"
                      other="plot_size"
                      register={register(
                        "plot_size",
                        validationRules.plot_size
                      )}
                    />
                    {errors.plot_size && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.plot_size.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Crop <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full pl-3 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800 ${
                      errors.primaryCrop ? "border-red-300" : "border-gray-300"
                    }`}
                    {...register("primaryCrop", validationRules.primaryCrop)}
                  >
                    <option value="">Select your primary crop</option>
                    <option value="corn">Corn (Maize)</option>
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="beans">Beans</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="coffee">Coffee</option>
                    <option value="tea">Tea</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.primaryCrop && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.primaryCrop.message}
                    </span>
                  )}
                </div>

                <div>
                  <PasswordField
                    name="password"
                    label="Password"
                    showPassword={showPassword}
                    toggleVisibility={togglePasswordVisibility}
                    placeholder="Create a strong password"
                    other="password"
                    register={register("password", validationRules.password)}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </span>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    Password must contain uppercase, lowercase, number and
                    special character
                  </div>
                </div>

                <div>
                  <PasswordField
                    name="confirmPassword"
                    label="Confirm Password"
                    showPassword={showConfirmPassword}
                    toggleVisibility={toggleConfirmPasswordVisibility}
                    placeholder="Confirm your password"
                    other="confirmPassword"
                    register={register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                    {...register("terms", validationRules.terms)}
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                </motion.div>
                {errors.terms && (
                  <span className="text-red-500 text-sm">
                    {errors.terms.message}
                  </span>
                )}

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrevStep}
                    type="button"
                    className="flex-1 py-3 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 rounded-lg bg-green-600 text-white font-medium transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-green-600 font-medium hover:text-green-800 focus:outline-none underline"
                  onClick={() => navigate("/auth/login")}
                >
                  Sign in here
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
