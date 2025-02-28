import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBatteryThreeQuarters, FaThermometerHalf, FaTint, FaWalking } from "react-icons/fa";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import { format } from "date-fns";
import { RxArrowLeft } from "react-icons/rx";
import ClientLayout from "@/layouts/client/ClientLayout";

const sensors = [
  {
    id: 1,
    type: "Temperature",
    date: "2024-02-25",
    customerName: "John Doe",
    status: "Active",
    battery: "85",
    location: "Main Building",
    lastReading: "24.5°C",
    serialNumber: "TEMP-2024-001",
  },
  {
    id: 2,
    type: "Humidity",
    date: "2024-02-24",
    customerName: "Jane Smith",
    status: "Inactive",
    battery: "60",
    location: "Warehouse",
    lastReading: "65%",
    serialNumber: "HUM-2024-042",
  },
  {
    id: 3,
    type: "Motion",
    date: "2024-02-23",
    customerName: "Alice Johnson",
    status: "Active",
    battery: "75",
    location: "Office Floor 3",
    lastReading: "Motion detected",
    serialNumber: "MOT-2024-107",
  },
];

interface SensorProp {
  id: number;
  type: string;
  date: string;
  customerName: string;
  status: string;
  battery: string;
  location?: string;
  lastReading?: string;
  serialNumber?: string;
}

const getSensorIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "temperature":
      return <FaThermometerHalf className="text-red-500" />;
    case "humidity":
      return <FaTint className="text-blue-500" />;
    case "motion":
      return <FaWalking className="text-purple-500" />;
    default:
      return null;
  }
};

const getBatteryColor = (level: string) => {
  const batteryLevel = parseInt(level);
  if (batteryLevel >= 75) return "bg-green-500";
  if (batteryLevel >= 50) return "bg-yellow-500";
  if (batteryLevel >= 25) return "bg-orange-500";
  return "bg-red-500";
};

const Sensor = () => {
  const [sensorData, setSensorData] = useState<SensorProp[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate API call with a small delay
    setLoading(true);
    setTimeout(() => {
      if (id) {
        const data = sensors.filter((sensor) => sensor.id === parseInt(id));
        setSensorData(data);
      }
      setLoading(false);
    }, 600);
  }, [id]);

  if (loading) {
    return (
      <ClientLayout className="">
        <div className="p-6 flex h-screen justify-center items-center bg-gray-50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading sensor data...</p>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout className="">
        <div className="bg-gray-50 py-4 px-10 flex items-center space-x-2 hover:text-blue-600" onClick={() => navigate("/client/sensor")}>
        <RxArrowLeft />
            <p className="text-slate-500 hover:text-blue-600">Back To Sensors</p>
        </div>
      <div className="p-6 flex justify-center  bg-gray-50">
        {sensorData.length > 0 ? (
          sensorData.map((sensor) => (
            <div
              key={sensor.id}
              className="bg-white shadow-xl rounded-lg overflow-hidden max-w-lg w-full"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-full">
                    {getSensorIcon(sensor.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {sensor.type} Sensor
                    </h2>
                    <p className="text-blue-100 text-sm">
                      ID: {sensor.serialNumber || `#${sensor.id}`}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium flex items-center ${
                    sensor.status.toLowerCase() === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {sensor.status === "Active" ? (
                    <HiStatusOnline className="mr-1" />
                  ) : (
                    <HiStatusOffline className="mr-1" />
                  )}
                  {sensor.status}
                </div>
              </div>

              {/* Main Content */}
              <div className="px-6 py-4">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Sensor Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-gray-600">Customer:</div>
                    <div className="text-gray-900 font-medium">{sensor.customerName}</div>
                    
                    <div className="text-gray-600">Location:</div>
                    <div className="text-gray-900 font-medium">{sensor.location || "Not specified"}</div>
                    
                    <div className="text-gray-600">Installation Date:</div>
                    <div className="text-gray-900 font-medium">
                      {format(new Date(sensor.date), "PPP")}
                    </div>
                    
                    <div className="text-gray-600">Last Reading:</div>
                    <div className="text-gray-900 font-medium">{sensor.lastReading || "N/A"}</div>
                  </div>
                </div>

                {/* Battery Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Battery Status</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <FaBatteryThreeQuarters 
                        className={`text-xl ${
                          parseInt(sensor.battery) > 50 ? "text-green-500" : "text-orange-500"
                        }`} 
                      />
                      <span className="text-gray-700 font-medium">Current Level: {sensor.battery}%</span>
                    </div>
                    <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ease-out ${getBatteryColor(sensor.battery)}`}
                        style={{ width: `${sensor.battery}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {parseInt(sensor.battery) < 25 
                        ? "Battery level critical! Please replace soon." 
                        : parseInt(sensor.battery) < 50
                          ? "Battery level low. Consider replacing in the next maintenance."
                          : "Battery level good."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium text-sm">
                  View Details
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium text-sm">
                  Edit Sensor
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No sensor found</h3>
            <p className="mt-1 text-gray-500">
              The sensor with ID #{id} could not be found or might have been removed.
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default Sensor;