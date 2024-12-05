import image from "../../../assets/image.png";

import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen max-sm:w-full max-sm:items-center max-sm:justify-center">
      <div className="w-[50vw] max-sm:hidden">
        <img src={image} alt="image" className="h-full object-cover" />
      </div>
      <div className="h-full flex flex-col items-center justify-center  w-[50vw] gap-4">
        <div className="w-[30vw] text-center">
          <p className="text-4xl">Forgot Password?</p>
          <p className="text-gray-600 text-xl pt-4">
            Don’t worry ! It happens. Please enter the phone number/email we
            will send you the OTP.
          </p>
        </div>
        <form action="" className="space-y-4 pt-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              placeholder="Type you email"
              className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
            />
          </div>

          <div className="flex flex-col gap-4 pt-10">
            <button className="text-white bg-green-600 hover:bg-green-400 px-10 rounded-full py-3 ">
              Continue
            </button>
          </div>

          <div>
            <p className="text-center text-slate-500">
              Need an account?{" "}
              <span
                className="text-blue-500 underline hover:cursor-pointer"
                onClick={() => navigate("/auth/register")}
              >
                Create One
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
