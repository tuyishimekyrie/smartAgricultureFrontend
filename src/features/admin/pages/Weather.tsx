import { useEffect, useState } from "react";
import { FaCloud, FaCloudRain, FaEye, FaSun, FaWind } from "react-icons/fa";
import {
  WiBarometer,
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiHumidity,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { AdminLayout } from "../../../layouts/admin";
import {  WeatherResponse } from "../types";

const Weather = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedTemp, setAnimatedTemp] = useState(0);
  const [animatedHumidity, setAnimatedHumidity] = useState(0);
  const [animatedWind, setAnimatedWind] = useState(0);
  const [weatherData, setWeatherData] = useState<WeatherResponse>();


  // Fetch weather data on component mount
  useEffect(() => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY;
    const fetchWeatherData = () => {
      const myLocation = [-1.9556742333828294, 30.10419819814898];
      const url = `/api/weatherbit/current?lat=${myLocation[0]}&lon=${myLocation[1]}&key=${api_key}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
          // Set initial load animation
          setTimeout(() => {
            setIsLoaded(true);
          }, 300);
        })
        .catch((error) => console.error(error));
    };
    fetchWeatherData();
  }, []);

  // Start animations after weatherData is loaded
  useEffect(() => {
    if (!weatherData) return;

    const current = weatherData.data[0];

    // Animate temperature
    let tempCounter = 0;
    const tempInterval = setInterval(() => {
      tempCounter += 1;
      setAnimatedTemp(tempCounter);
      if (tempCounter >= current.temp) clearInterval(tempInterval);
    }, 50);

    // Animate humidity
    let humidityCounter = 0;
    const humidityInterval = setInterval(() => {
      humidityCounter += 1;
      setAnimatedHumidity(humidityCounter);
      if (humidityCounter >= current.rh) clearInterval(humidityInterval);
    }, 60);

    // Animate wind speed
    let windCounter = 0;
    const windInterval = setInterval(() => {
      windCounter += 0.1;
      setAnimatedWind(parseFloat(windCounter.toFixed(1)));
      if (windCounter >= current.wind_spd) clearInterval(windInterval);
    }, 70);

    // Clean up intervals
    return () => {
      clearInterval(tempInterval);
      clearInterval(humidityInterval);
      clearInterval(windInterval);
    };
  }, [weatherData]);

  const getWeatherIcon = (code:number) => {
    if (code < 300)
      return <FaCloudRain className="text-blue-500 animate-bounce" />;
    if (code < 600)
      return <FaCloudRain className="text-blue-400 animate-bounce" />;
    if (code < 700) return <FaCloud className="text-gray-400 animate-pulse" />;
    if (code === 800)
      return <WiDaySunny className="text-yellow-500 animate-spin-slow" />;
    if (code < 900)
      return <WiDayCloudy className="text-gray-300 animate-pulse" />;
    return <WiDaySunny className="text-yellow-500 animate-spin-slow" />;
  };

  // Format time from 24hr to 12hr format with AM/PM
  const formatTime = (timeStr:string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Get current weather data
  const current = weatherData?.data?.[0];

  // If data is not loaded yet, show loading state
  if (!current) {
    return (
      <AdminLayout className="p-4 h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="max-w-5xl mx-auto flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout className="p-4 h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-sky-100">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes floatUp {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-floatUp {
          animation: floatUp 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`mb-6 text-center md:text-left animate-fadeIn ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Weather Dashboard
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Main Weather Card */}
        <div
          className={`bg-white rounded-2xl shadow-lg overflow-hidden mb-6 transform transition-all duration-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-1 animate-fadeIn delay-100">
                  {current.city_name}, {current.country_code}
                </h2>
                <p className="text-xl opacity-90 animate-fadeIn delay-200">
                  {current.weather.description}
                </p>
                <div className="flex items-center mt-4">
                  <div className="text-6xl font-bold animate-fadeIn delay-300">
                    {animatedTemp}°C
                  </div>
                  <div className="ml-6 text-5xl animate-floatUp">
                    {getWeatherIcon(current.weather.code)}
                  </div>
                </div>
                <p className="mt-2 text-blue-100 animate-fadeIn delay-400">
                  Feels like: {current.app_temp}°C
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-400 bg-opacity-30 rounded-lg p-3 transition-all duration-300 transform hover:scale-105 animate-fadeIn delay-400">
                  <div className="flex justify-center mb-2 animate-pulse">
                    <WiHumidity size={32} />
                  </div>
                  <p className="text-sm">Humidity</p>
                  <p className="text-2xl font-semibold">{animatedHumidity}%</p>
                </div>
                <div className="bg-blue-400 bg-opacity-30 rounded-lg p-3 transition-all duration-300 transform hover:scale-105 animate-fadeIn delay-500">
                  <div className="flex justify-center mb-2">
                    <FaWind size={24} className="animate-spin-slow" />
                  </div>
                  <p className="text-sm">Wind</p>
                  <p className="text-2xl font-semibold">{animatedWind} m/s</p>
                  <p className="text-xs">{current.wind_cdir_full}</p>
                </div>
                <div className="bg-blue-400 bg-opacity-30 rounded-lg p-3 transition-all duration-300 transform hover:scale-105 animate-fadeIn delay-600">
                  <div className="flex justify-center mb-2">
                    <WiBarometer size={32} className="animate-pulse" />
                  </div>
                  <p className="text-sm">Pressure</p>
                  <p className="text-2xl font-semibold">{current.pres} mb</p>
                </div>
                <div className="bg-blue-400 bg-opacity-30 rounded-lg p-3 transition-all duration-300 transform hover:scale-105 animate-fadeIn delay-700">
                  <div className="flex justify-center mb-2">
                    <FaSun size={24} className="animate-spin-slow" />
                  </div>
                  <p className="text-sm">UV Index</p>
                  <p className="text-2xl font-semibold">{current.uv}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 animate-fadeIn delay-200">
              Today's Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center transition-all duration-300 transform hover:bg-blue-50 hover:shadow-md animate-fadeIn delay-300">
                <WiSunrise
                  size={36}
                  className="text-amber-500 mb-2 animate-floatUp"
                />
                <p className="text-gray-500 text-sm">Sunrise</p>
                <p className="text-lg font-medium">
                  {formatTime(current.sunrise)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center transition-all duration-300 transform hover:bg-blue-50 hover:shadow-md animate-fadeIn delay-400">
                <WiSunset
                  size={36}
                  className="text-orange-500 mb-2 animate-floatUp"
                />
                <p className="text-gray-500 text-sm">Sunset</p>
                <p className="text-lg font-medium">
                  {formatTime(current.sunset)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center transition-all duration-300 transform hover:bg-blue-50 hover:shadow-md animate-fadeIn delay-500">
                <FaEye size={28} className="text-blue-500 mb-2 animate-pulse" />
                <p className="text-gray-500 text-sm">Visibility</p>
                <p className="text-lg font-medium">{current.vis} km</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center transition-all duration-300 transform hover:bg-blue-50 hover:shadow-md animate-fadeIn delay-600">
                <WiCloudy
                  size={36}
                  className="text-gray-400 mb-2 animate-pulse"
                />
                <p className="text-gray-500 text-sm">Cloudiness</p>
                <p className="text-lg font-medium">{current.clouds}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality & Solar Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div
            className={`bg-white rounded-xl shadow-md p-5 transform transition-all duration-500 animate-pulse-glow ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } animate-fadeIn delay-300`}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Air Quality
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">{current.aqi}</div>
              <div
                className={`text-lg px-4 py-1 rounded-full transition-all duration-500 hover:scale-105 ${
                  current.aqi < 50
                    ? "bg-green-100 text-green-800"
                    : current.aqi < 100
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {current.aqi < 50
                  ? "Good"
                  : current.aqi < 100
                  ? "Moderate"
                  : "Poor"}
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-xl shadow-md p-5 transform transition-all duration-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } animate-fadeIn delay-400`}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Solar Radiation
            </h3>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-50 rounded-full animate-pulse">
                <FaSun size={24} className="text-amber-500 animate-spin-slow" />
              </div>
              <div>
                <p className="text-gray-500">Solar Rad</p>
                <p className="text-2xl font-medium">{current.solar_rad} W/m²</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div
          className={`bg-white rounded-xl shadow-md p-5 transform transition-all duration-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } animate-fadeIn delay-500`}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Location Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <p className="text-gray-500">Latitude</p>
              <p className="text-lg font-medium">{current.lat}°</p>
            </div>
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <p className="text-gray-500">Longitude</p>
              <p className="text-lg font-medium">{current.lon}°</p>
            </div>
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <p className="text-gray-500">Timezone</p>
              <p className="text-lg font-medium">{current.timezone}</p>
            </div>
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <p className="text-gray-500">Observation Time</p>
              <p className="text-lg font-medium">{current.ob_time}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Weather;