import image from "../../../assets/image.png";
import google from "../../../assets/google.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen font-plus max-sm:w-full max-sm:items-center max-sm:justify-center">
      <div className="w-[50vw] max-sm:hidden ">
        <img src={image} alt="image" className="h-full object-cover" />
      </div>
      <div className="h-full flex flex-col items-center justify-center w-[50vw] max-sm:w-full max-sm:px-8 gap-4">
        <div className="px-10">
          <p className="text-4xl max-sm:text-xl">Sign In</p>
          <p className="text-gray-600 text-xl pt-4 max-sm:text-sm">
            Fill the form below with your personal information
          </p>
        </div>
        <form
          action=""
          className="space-y-4 pt-10 w-full px-[10vw] max-sm:w-full"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username">username/email</label>
            <input
              type="text"
              required
              placeholder="Type you username/email"
              className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">password</label>
            <input
              type="password"
              required
              placeholder="Type you password"
              className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
            />
          </div>

          <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4">
            <div className="space-x-2">
              <input type="checkbox" name="" id="" />
              <label htmlFor="" className="max-sm:text-sm">
                Keep Me Logged in
              </label>
            </div>
            <p
              className="text-blue-500 underline hover:cursor-pointer max-sm:text-sm"
              onClick={() => navigate("/auth/forgot")}
            >
              Forgot Password?
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-10">
            <button className="text-white bg-green-600 hover:bg-green-400 px-10 rounded-full py-3 ">
              Sign in
            </button>
            <p className="text-center text-slate-400">or</p>
            <button className="text-white bg-green-600 hover:bg-green-400 px-10 rounded-full py-3 flex items-center justify-center gap-4">
              <img src={google} alt="" className="w-6 max-sm:w-4" />
              <span className="max-sm:text-xs">Sign in with google</span>
            </button>
          </div>

          <div>
            <p className="text-center text-slate-500 pt-10">
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

export default Login;
