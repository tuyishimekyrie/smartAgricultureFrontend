import { LuMoveRight } from "react-icons/lu";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate  = useNavigate();
  return (
    <div className=" h-full w-full bg-hero bg-cover  font-plus">
      <div className="bg-black h-screen max-lg:h-screen w-full bg-opacity-40">
        <div>
          <h1>
            <img src={logo} alt="Logo" className="w-20" />
          </h1>
        </div>
        <div className=" space-y-6 w-50 max-lg:w-full flex flex-col items-center justify-center px-80 max-lg:px-10 pt-60 max-lg:pt-40">
          <h1 className="text-white text-6xl max-lg:text-xl">
            Empowering Precision Farming with Smart Agriculture Sensors
          </h1>
          <h3 className="text-gray-200 text-xl max-lg:text-sm">
            Harness the power of cutting-edge sensors to revolutionize your
            farming practices. Our advanced agriculture sensors provide
            real-time data on soil moisture, temperature, humidity, and more,
            helping you optimize crop health, conserve water, and maximize
            yields. Whether you're managing small fields or large-scale
            operations, our sensors ensure you make data-driven decisions for
            sustainable, efficient farming.
          </h3>

          <div className="flex justify-between gap-10 max-sm:flex-col">
            <button className="text-white bg-green-600 hover:bg-green-400 px-10 rounded-full py-3 justify-between flex items-center gap-4" onClick={() => navigate("/auth/login")}>
              Login
              <LuMoveRight />
            </button>
            <button className="text-white  bg-green-600 hover:bg-green-400 px-10 rounded-full py-3 justify-between flex items-center gap-4" onClick={() => navigate("/auth/register")}>
              Register
              <LuMoveRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
