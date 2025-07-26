import { CiSettings } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { MdSensors } from "react-icons/md";
import { TiWeatherCloudy } from "react-icons/ti";

export const MENU_ITEMS = [
    {
      id: 1,
      name: "Dashboard",
      icon: <GoHome className="w-6 h-6" />,
      href: "/admin",
    },
    {
      id: 2,
      name: "Weather",
      icon: <TiWeatherCloudy className="w-6 h-6" />,
      href: "/admin/weather",
    },
    {
      id: 3,
      name: "Map",
      icon: <FaMapLocationDot className="w-6 h-6" />,
      href: "/admin/map",
    },
    {
      id: 4,
      name: "Sensor",
      icon: <MdSensors className="w-6 h-6" />,
      href: "/admin/sensor",
    },
     {
      id: 5,
      name: "Sensor Types",
      icon: <MdSensors className="w-6 h-6" />,
      href: "/admin/sensor-type",
    },
    {
      id: 6,
      name: "users",
      icon: <FaUsers className="w-6 h-6" />,
      href: "/admin/users",
    },
    {
      id: 7,
      name: "Settings",
      icon: <CiSettings className="w-6 h-6" />,
      href: "/admin/settings",
    },
  ];