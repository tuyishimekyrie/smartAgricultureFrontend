import { FcChargeBattery } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import ClientLayout from "@/layouts/client/ClientLayout";
// import { sensors } from "../utils";
import { api } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast, Toaster } from "sonner";

interface User{
  id: string;
  email: string;
  role: string;
}

interface Sensor{
  type: string,
  id: number,
  date: string,
  customerName: string,
  status: string,
  battery: string
}

const Sensors = () => {
  const navigate = useNavigate();
  const decode = jwtDecode<User>(localStorage.getItem("token") || "{}");
  const [sensorData,setSensorData] = useState<Sensor[]>([])
  console.log(decode);
  useEffect(() => {
    api.get("api/sensor/user/"+decode.id).then((response) => {
      console.log(response.data);
      if(response.data == null) {
        toast.info("No sensors found for this user.");

        return;
      }
      setSensorData(response.data);
      toast.success("Sensors fetched successfully!");
    }).catch((error) => {
      console.error("Error fetching sensors:", error);
      toast.error("Failed to fetch sensors. Please try again.");
    })
  },[decode.id])

  return (
    <ClientLayout className="">
      <Toaster/>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">All Sensors</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-md bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-3 border-b">Type</th>
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Customer Name</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Battery</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.length > 0 && sensorData.map((sensor, index) => (
                <tr
                  key={sensor.id}
                  onClick={() => navigate("/client/sensor/" + sensor.id)}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="p-3">{sensor.type}</td>
                  <td className="p-3">{sensor.id}</td>
                  <td className="p-3">{sensor.date}</td>
                  <td className="p-3">{sensor.customerName}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm font-medium text-white rounded-full ${
                        sensor.status.toLowerCase() === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {sensor.status}
                    </span>
                  </td>
                  <td className="p-3 flex items-center space-x-2">
                    <FcChargeBattery className="text-xl" />
                    <span>{sensor.battery}</span>
                  </td>
                </tr>
              ))} 
            </tbody>
          </table>
          {sensorData.length === 0 && (
            <div className="text-center p-6">
              <p className="text-gray-500">No sensors available.</p>     
              </div>
            )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default Sensors;
