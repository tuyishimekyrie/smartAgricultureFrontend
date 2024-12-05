import { useNavigate } from "react-router-dom";
import image from "../../../assets/image.png";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen font-plus max-lg:w-full max-lg:items-center max-lg:justify-center">
      <div className="w-[50vw] max-lg:hidden">
        <img src={image} alt="image" className="h-full object-cover" />
      </div>
      <div className="h-full flex flex-col items-center justify-center w-[50vw] max-md:w-full max-md:px-8 gap-2">
        <div>
          <p className="text-2xl">Sign Up</p>
          <p className="text-gray-600 text-xl pt-4">
            Fill the form below with your personal information
          </p>
        </div>
        <form action="" className="space-y-2 pt-4 ">
          <div className="flex gap-8 max-lg:flex-col ">
            <div>
              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="affiliation">affiliation Number</label>
                <input
                  type="text"
                  required
                  placeholder="Type you affiliation number"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  required
                  placeholder="Type you email"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="gender">gender</label>
                <input
                  type="text"
                  required
                  placeholder="Type you gender"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="phone Number">phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="Type you phone number"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="address">address</label>
                <input
                  type="text"
                  required
                  placeholder="Type you address"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="plot number">plot number</label>
                <input
                  type="text"
                  required
                  placeholder="Type you plot number"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="plot size">plot size</label>
                <input
                  type="text"
                  required
                  placeholder="Type you plot size"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="email">Id number</label>
                <input
                  type="text"
                  required
                  placeholder="Type you id number"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  required
                  placeholder="Type you password"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-4 pt-2">
                <label htmlFor="confirm password">confirm password</label>
                <input
                  type="password"
                  required
                  placeholder="Type you confirm password"
                  className="border border-slate-300 px-2 py-2 rounded-md placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button className="text-white bg-green-600 hover:bg-green-400 px-10 rounded-full py-3 ">
              Sign in
            </button>
          </div>

          <div>
            <p className="text-center text-slate-500">
              Already Have an account?{" "}
              <span
                className="text-blue-500 underline hover:cursor-pointer"
                onClick={() => navigate("/auth/login")}
              >
                Sign in
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
