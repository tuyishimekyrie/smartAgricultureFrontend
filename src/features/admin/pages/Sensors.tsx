import { FcChargeBattery } from "react-icons/fc";
import { AdminLayout } from "../../../layouts/admin";
import { useNavigate } from "react-router-dom";

const Sensors = () => {
 const sensors = [
    {
      id: 1,
      type: "Temperature",
      date: "2024-02-25",
      customerName: "John Doe",
      status: "Active",
      battery: "85%",
    },
    {
      id: 2,
      type: "Humidity",
      date: "2024-02-24",
      customerName: "Jane Smith",
      status: "Inactive",
      battery: "60%",
    },
    {
      id: 3,
      type: "Motion",
      date: "2024-02-23",
      customerName: "Alice Johnson",
      status: "Active",
      battery: "75%",
    },
  ];

  const navigate = useNavigate();

  return (
    <AdminLayout className="">
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
              {sensors.map((sensor, index) => (
                <tr
                  key={sensor.id}
                  onClick={() => navigate("/admin/sensor/" + sensor.id)}
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default Sensors;
