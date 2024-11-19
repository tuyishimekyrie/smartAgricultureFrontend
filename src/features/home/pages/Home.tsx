import { LuMoveRight } from "react-icons/lu";
import logo from "../../../assets/logo.png"

const Home = () => {
  return (
    <div className="bg-black h-screen w-full bg-hero bg-cover px-10 py-4 font-plus">
      <div>
        <h1><img src={logo} alt="Logo" className="w-20"/></h1>
      </div>
      <div className="pt-[30vh] space-y-6">
        <h1 className="text-white text-4xl">
          Empowering Precision Farming with Smart Agriculture Sensors
        </h1>
        <h3 className="text-gray-200">
          Harness the power of cutting-edge sensors to revolutionize your
          farming practices. Our advanced agriculture sensors provide real-time
          data on soil moisture, temperature, humidity, and more, helping you
          optimize crop health, conserve water, and maximize yields. Whether
          you're managing small fields or large-scale operations, our sensors
          ensure you make data-driven decisions for sustainable, efficient
          farming.
        </h3>

        <div className="flex justify-between ">
          <button className="text-white bg-green-500 hover:bg-green-600 px-10 rounded-full py-3 justify-between flex items-center gap-4">
            Login
            <LuMoveRight />
          </button>
          <button className="text-white bg-green-500 hover:bg-green-600 px-10 rounded-full py-3 justify-between flex items-center gap-4">
            Register
            <LuMoveRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
