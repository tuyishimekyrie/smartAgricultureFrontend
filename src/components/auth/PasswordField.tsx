import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProp {
  label: string;
  showPassword: boolean;
  toggleVisibility: () => void;
  placeholder: string;
  other: string;
  name:string;
  register: UseFormRegisterReturn;
}

const PasswordField = ({
  label,
  showPassword,
  toggleVisibility,
  placeholder,
  register,
}: PasswordFieldProp) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 capitalize">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          <FaLock />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          required
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 text-gray-800"
          {...register}
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
};

export default PasswordField;
