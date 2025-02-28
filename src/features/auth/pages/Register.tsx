import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaLeaf, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { LuCrop, LuRuler } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import image from "../../../assets/image.png";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNextStep = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePrevStep = (e: { preventDefault: () => void; }) => {
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
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  interface InputFieldProp {
    label: string,
    icon: ReactNode,
    placeholder: string,
    required: boolean,
    type: string
  }

  const InputField = ({ label, icon, type = "text", placeholder, required = true }:InputFieldProp) => (
    <motion.div variants={itemVariants} className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 capitalize">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          {icon}
        </div>
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 text-gray-800"
        />
      </div>
    </motion.div>
  );
  interface PasswordFieldProp {
    label: string,
    showPassword:boolean,
    toggleVisibility: () => void,
    placeholder: string
  }

  const PasswordField = ({ label, showPassword, toggleVisibility, placeholder }:PasswordFieldProp) => (
    <motion.div variants={itemVariants} className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 capitalize">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          <FaLock />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          required
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 text-gray-800"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          onClick={toggleVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="flex h-screen font-plus overflow-hidden bg-gray-50">
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
            <h2 className="text-3xl font-bold mb-4">Join Our Smart Farming Community</h2>
            <p className="text-green-50 mb-6">
              Get access to cutting-edge agricultural sensors, real-time data analytics, and expert insights to optimize your farming operations.
            </p>
            <div className="flex justify-center space-x-2 mt-8">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/30"
                ></div>
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
            <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
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
                      step <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                    } mx-auto z-10 relative transition-all duration-300`}
                  >
                    {step}
                  </div>
                  <div className="text-xs text-center mt-1 font-medium">
                    {step === 1 ? 'Personal Info' : 'Farm Details'}
                  </div>
                  {step < totalSteps && (
                    <div 
                      className={`absolute top-4 left-0 right-0 h-0.5 -translate-y-1/2 ${
                        step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                      } transition-all duration-300`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Form */}
          <form>
            {currentStep === 1 && (
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField 
                    label="Affiliation Number"
                    icon={<IoMdCard />}
                    placeholder="Enter affiliation number" required={false} type={""}                  />
                  <InputField 
                    label="Email"
                    icon={<FaEnvelope />}
                    type="email"
                    placeholder="your.email@example.com" required={false}                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField 
                    label="Full Name"
                    icon={<FaUser />}
                    placeholder="Enter your full name" required={false} type={""}                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 capitalize">Gender</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center">
                        <input
                          id="gender-male"
                          name="gender"
                          type="radio"
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="gender-male" className="ml-2 block text-sm text-gray-700">
                          Male
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="gender-female"
                          name="gender"
                          type="radio"
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="gender-female" className="ml-2 block text-sm text-gray-700">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField 
                    label="Phone Number"
                    icon={<FaPhone />}
                    placeholder="Enter phone number" required={false} type={""}                  />
                  <InputField 
                    label="ID Number"
                    icon={<IoMdCard />}
                    placeholder="Enter ID number" required={false} type={""}                  />
                </div>
                
                <InputField 
                  label="Address"
                  icon={<FaMapMarkerAlt />}
                  placeholder="Enter your address" required={false} type={""}                />
                
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
                    placeholder="Enter plot number" required={false} type={""}                  />
                  <InputField 
                    label="Plot Size (hectares)"
                    icon={<LuRuler />}
                    placeholder="Enter plot size" required={false} type={""}                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Primary Crop</label>
                  <select className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800">
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
                />
                
                <PasswordField 
                  label="Confirm Password" 
                  showPassword={showConfirmPassword} 
                  toggleVisibility={toggleConfirmPasswordVisibility} 
                  placeholder="Confirm your password"
                />
                
                <motion.div variants={itemVariants} className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-green-600 hover:text-green-800">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-800">Privacy Policy</a>
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