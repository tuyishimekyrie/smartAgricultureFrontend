import { CiSettings } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { MdSensors } from "react-icons/md";
import { TiWeatherCloudy } from "react-icons/ti";

export const MENU_ITEMS = [
    {
      id: 1,
      name: "Dashboard",
      icon: <GoHome className="w-6 h-6" />,
      href: "/client",
    },
    {
      id: 2,
      name: "Weather",
      icon: <TiWeatherCloudy className="w-6 h-6" />,
      href: "/client/weather",
    },
    {
      id: 3,
      name: "Map",
      icon: <FaMapLocationDot className="w-6 h-6" />,
      href: "/client/map",
    },
    {
      id: 4,
      name: "Sensor",
      icon: <MdSensors className="w-6 h-6" />,
      href: "/client/sensor",
    },
    {
      id: 5,
      name: "Settings",
      icon: <CiSettings className="w-6 h-6" />,
      href: "/client/settings",
    },
  ];