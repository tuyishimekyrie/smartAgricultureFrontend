import { useEffect, useState } from "react";
import {
  FaCloud,
  FaCloudRain,
  FaEye,
  FaSun,
  FaWind
} from "react-icons/fa";
import { 
  WiBarometer, 
  WiCloudy, 
  WiDayCloudy, 
  WiDaySunny, 
  WiHumidity, 
  WiSunrise, 
  WiSunset 
} from "react-icons/wi";
import { motion, AnimatePresence } from "framer-motion";
import ClientLayout from "@/layouts/client/ClientLayout";

const Weather = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedTemp, setAnimatedTemp] = useState(0);
  const [animatedHumidity, setAnimatedHumidity] = useState(0);
  const [animatedWind, setAnimatedWind] = useState(0);
  const [activeTab, setActiveTab] = useState("today");
  
  // Normally we would fetch this data, but using the provided data directly
  const weatherData = {
    data: [
      {
        app_temp: 28.7,
        aqi: 51,
        city_name: "Kigali",
        clouds: 46,
        country_code: "RW",
        datetime: "2025-02-24:13",
        dewpt: 9.5,
        dhi: 112,
        dni: 923,
        elev_angle: 47.79,
        ghi: 789,
        h_angle: 45,
        lat: -1.9557,
        lon: 30.1041,
        ob_time: "2025-02-24 13:00",
        pod: "d",
        precip: 0,
        pres: 859,
        rh: 28,
        slp: 1016,
        snow: 0,
        solar_rad: 744,
        sources: ["HRYR", "radar", "satellite"],
        state_code: "12",
        station: "HRYR",
        sunrise: "04:07",
        sunset: "16:17",
        temp: 30,
        timezone: "Africa/Kigali",
        ts: 1740402000,
        uv: 5,
        vis: 16,
        weather: {
          description: "Scattered clouds",
          code: 802,
          icon: "c02d"
        },
        wind_cdir: "N",
        wind_cdir_full: "north",
        wind_dir: 360,
        wind_spd: 4.1
      }
    ]
  };

  // Animate the values on component mount
  useEffect(() => {
    const current = weatherData.data[0];
    
    // Set initial load animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // References to maintain updated state in intervals
    let tempCounter = 0;
    let humidityCounter = 0;
    let windCounter = 0;
    
    // Animate temperature
    const tempInterval = setInterval(() => {
      if (tempCounter >= current.temp) {
        clearInterval(tempInterval);
        // Ensure the final value is exactly the target
        setAnimatedTemp(current.temp);
        return;
      }
      tempCounter += 1;
      setAnimatedTemp(tempCounter);
    }, 50);
    
    // Animate humidity
    const humidityInterval = setInterval(() => {
      if (humidityCounter >= current.rh) {
        clearInterval(humidityInterval);
        // Ensure the final value is exactly the target
        setAnimatedHumidity(current.rh);
        return;
      }
      humidityCounter += 1;
      setAnimatedHumidity(humidityCounter);
    }, 60);
    
    // Animate wind speed
    const windInterval = setInterval(() => {
      if (windCounter >= current.wind_spd) {
        clearInterval(windInterval);
        // Ensure the final value is exactly the target
        setAnimatedWind(current.wind_spd);
        return;
      }
      windCounter += 0.1;
      setAnimatedWind(parseFloat(windCounter.toFixed(1)));
    }, 70);
    
    // Clean up intervals
    return () => {
      clearInterval(tempInterval);
      clearInterval(humidityInterval);
      clearInterval(windInterval);
    };
  }, [weatherData.data]);

  const getWeatherIcon = (code:number) => {
    if (code < 300) return <FaCloudRain className="text-blue-500" />;
    if (code < 600) return <FaCloudRain className="text-blue-400" />;
    if (code < 700) return <FaCloud className="text-gray-400" />;
    if (code === 800) return <WiDaySunny className="text-yellow-500" />;
    if (code < 900) return <WiDayCloudy className="text-gray-300" />;
    return <WiDaySunny className="text-yellow-500" />;
  };

  // Format time from 24hr to 12hr format with AM/PM
  const formatTime = (timeStr:string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 20 
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const spinVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Get current weather data
  const current = weatherData.data[0];

  return (
    <ClientLayout className=" h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-sky-100">
      <AnimatePresence>
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div 
            className="mb-6 text-center md:text-left"
            variants={itemVariants}
          >
            <h1 className="text-3xl font-bold text-gray-800">Weather Dashboard</h1>
            <p className="text-gray-600">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            className="mb-6 flex items-center justify-center md:justify-start space-x-1 bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-md"
            variants={itemVariants}
          >
            {["today", "forecast", "history", "alerts"].map((tab) => (
              <motion.button
                key={tab}
                className={`px-4 py-2 rounded-md capitalize font-medium transition-colors ${
                  activeTab === tab 
                    ? "bg-blue-500 text-white" 
                    : "text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Main Weather Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
            variants={cardVariants}
            whileHover="hover"
            layout
          >
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold mb-1">{current.city_name}, {current.country_code}</h2>
                  <p className="text-xl opacity-90">{current.weather.description}</p>
                  <div className="flex items-center mt-4">
                    <motion.div 
                      className="text-6xl font-bold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {animatedTemp}°C
                    </motion.div>
                    <motion.div 
                      className="ml-6 text-5xl"
                      variants={floatVariants}
                      animate="float"
                    >
                      {getWeatherIcon(current.weather.code)}
                    </motion.div>
                  </div>
                  <motion.p 
                    className="mt-2 text-blue-100"
                    variants={itemVariants}
                  >
                    Feels like: {current.app_temp}°C
                  </motion.p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <motion.div 
                    className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="flex justify-center mb-2"
                      variants={pulseVariants}
                      animate="pulse"
                    >
                      <WiHumidity size={32} />
                    </motion.div>
                    <p className="text-sm">Humidity</p>
                    <p className="text-2xl font-semibold">{animatedHumidity}%</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="flex justify-center mb-2"
                      variants={spinVariants}
                      animate="spin"
                    >
                      <FaWind size={24} />
                    </motion.div>
                    <p className="text-sm">Wind</p>
                    <p className="text-2xl font-semibold">{animatedWind} m/s</p>
                    <p className="text-xs">{current.wind_cdir_full}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="flex justify-center mb-2"
                      variants={pulseVariants}
                      animate="pulse"
                    >
                      <WiBarometer size={32} />
                    </motion.div>
                    <p className="text-sm">Pressure</p>
                    <p className="text-2xl font-semibold">{current.pres} mb</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="flex justify-center mb-2"
                      variants={spinVariants}
                      animate="spin"
                    >
                      <FaSun size={24} />
                    </motion.div>
                    <p className="text-sm">UV Index</p>
                    <p className="text-2xl font-semibold">{current.uv}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Additional Details */}
            <motion.div 
              className="p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Today's Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg flex flex-col items-center"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <motion.div
                    variants={floatVariants}
                    animate="float"
                  >
                    <WiSunrise size={36} className="text-amber-500 mb-2" />
                  </motion.div>
                  <p className="text-gray-500 text-sm">Sunrise</p>
                  <p className="text-lg font-medium">{formatTime(current.sunrise)}</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg flex flex-col items-center"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <motion.div
                    variants={floatVariants}
                    animate="float"
                  >
                    <WiSunset size={36} className="text-orange-500 mb-2" />
                  </motion.div>
                  <p className="text-gray-500 text-sm">Sunset</p>
                  <p className="text-lg font-medium">{formatTime(current.sunset)}</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg flex flex-col items-center"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    variants={pulseVariants}
                    animate="pulse"
                  >
                    <FaEye size={28} className="text-blue-500 mb-2" />
                  </motion.div>
                  <p className="text-gray-500 text-sm">Visibility</p>
                  <p className="text-lg font-medium">{current.vis} km</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg flex flex-col items-center"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    variants={pulseVariants}
                    animate="pulse"
                  >
                    <WiCloudy size={36} className="text-gray-400 mb-2" />
                  </motion.div>
                  <p className="text-gray-500 text-sm">Cloudiness</p>
                  <p className="text-lg font-medium">{current.clouds}%</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Air Quality & Solar Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-5 backdrop-blur-md"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Air Quality</h3>
              <div className="flex items-center justify-between">
                <motion.div 
                  className="text-4xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.5 }}
                >
                  {current.aqi}
                </motion.div>
                <motion.div 
                  className={`text-lg px-4 py-1 rounded-full ${
                    current.aqi < 50 ? "bg-green-100 text-green-800" : 
                    current.aqi < 100 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {current.aqi < 50 ? "Good" : current.aqi < 100 ? "Moderate" : "Poor"}
                </motion.div>
              </div>
              <motion.div 
                className="mt-4 bg-gray-100 h-2 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div 
                  className={`h-full ${
                    current.aqi < 50 ? "bg-green-500" : 
                    current.aqi < 100 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(current.aqi, 100)}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-md p-5"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Solar Radiation</h3>
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="p-3 bg-amber-50 rounded-full"
                  variants={spinVariants}
                  animate="spin"
                >
                  <FaSun size={24} className="text-amber-500" />
                </motion.div>
                <div>
                  <p className="text-gray-500">Solar Rad</p>
                  <motion.p 
                    className="text-2xl font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {current.solar_rad} W/m²
                  </motion.p>
                </div>
              </div>
              <motion.div 
                className="mt-4 relative h-16 bg-gradient-to-r from-yellow-100 to-amber-400 rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-amber-800">
                      {current.solar_rad > 700 ? "Excellent" : current.solar_rad > 400 ? "Good" : "Fair"} Solar Conditions
                    </p>
                  </div>
                </motion.div>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 w-1 bg-yellow-300 rounded-t-full opacity-75"
                    style={{ left: `${i * 12 + 8}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 50 + 30}%` }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Location Information */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-5"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Location Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                variants={itemVariants}
              >
                <p className="text-gray-500">Latitude</p>
                <p className="text-lg font-medium">{current.lat}°</p>
              </motion.div>
              <motion.div
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                variants={itemVariants}
              >
                <p className="text-gray-500">Longitude</p>
                <p className="text-lg font-medium">{current.lon}°</p>
              </motion.div>
              <motion.div
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                variants={itemVariants}
              >
                <p className="text-gray-500">Timezone</p>
                <p className="text-lg font-medium">{current.timezone}</p>
              </motion.div>
              <motion.div
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                variants={itemVariants}
              >
                <p className="text-gray-500">Observation Time</p>
                <p className="text-lg font-medium">{current.ob_time}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </ClientLayout>
  );
};

export default Weather;