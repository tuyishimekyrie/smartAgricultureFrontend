import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { motion } from "framer-motion";

interface InputFieldProp {
  label: string;
  icon: ReactNode;
  placeholder: string;
  required: boolean;
  type: string;
  other: string;
  register: UseFormRegisterReturn;
}

const InputField = ({
  label,
  icon,
  type = "text",
  placeholder,
  required = true,
  register,
}: InputFieldProp) => {
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
          {icon}
        </div>
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 text-gray-800"
          {...register}
        />
      </div>
    </motion.div>
  );
};

export default InputField;
