import image from "../../../assets/image.png";

// import { useNavigate } from "react-router-dom";

const Otp = () => {
//   const navigate = useNavigate();
  return (
    <div className="flex h-screen font-plus max-sm:w-full max-sm:items-center max-sm:justify-center">
      <div className="w-[50vw] max-sm:hidden">
        <img src={image} alt="image" className="h-full object-cover" />
      </div>
      <div className="h-full flex flex-col items-center justify-center  w-[50vw] gap-4">
        <div className="w-[30vw] text-center">
          <p className="text-4xl">OTP Verification</p>
          <p className="text-gray-600 text-xl pt-4">
          Please enter the sent OTP!!! 
          </p>
        </div>
        <form action="" className="space-y-4 pt-10">
          <div className="flex  gap-2">
            {/* <label htmlFor="num1">Email</label> */}
            <input
              type="number"
              required
              placeholder="2"
              className="border border-slate-300 rounded-md placeholder:text-gray-300 w-12 p-2"
            />
              <input
              type="number"
              required
              placeholder="2"
              className="border border-slate-300 rounded-md placeholder:text-gray-300 w-12 p-2"
            />
              <input
              type="number"
              required
              placeholder="2"
              className="border border-slate-300 rounded-md placeholder:text-gray-300 w-12 p-2"
            />
              <input
              type="number"
              required
              placeholder="2"
              className="border border-slate-300 rounded-md placeholder:text-gray-300 w-12 p-2"
            />
          </div>

          <div className="flex flex-col gap-4 pt-10">
            <button className="text-white bg-green-600 hover:bg-green-400 px-10 rounded-full py-3 ">
              Submit
            </button>
          </div>

          <div>
            <p className="text-center text-slate-500">
              Didn't receive otp?{" "}
              <span
                className="text-blue-500 underline"
                
              >
                Resend One
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
