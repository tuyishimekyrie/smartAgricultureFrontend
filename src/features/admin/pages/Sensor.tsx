import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "../../../layouts/admin";
import { HiStatusOffline, HiStatusOnline } from "react-icons/hi";
import { RxArrowLeft } from "react-icons/rx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface SensorTypeProp {
  id: number;
  name: string;
  description: string;
  unit: string;
  protocol: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SensorProp {
  id: number;
  name: string;
  status: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
  sensorType: SensorTypeProp;
}

const fetchSensorById = async (id: string): Promise<SensorProp> => {
  const response = await api.get(`/api/sensor/${id}`);
  return response.data;
};

const Sensor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: sensor,
    isLoading,
    isError,
    error,
  } = useQuery<SensorProp>({
    queryKey: ["sensor", id],
    queryFn: () => fetchSensorById(id!),
    enabled: !!id,
  });
  console.warn("An error occured",error)

  if (isLoading) {
    return (
      <AdminLayout className={""}>
        <div className="p-6 flex h-screen justify-center items-center bg-gray-50">
          <div className="max-w-lg w-full space-y-6">
            <Skeleton height={50} />
            <Skeleton count={5} height={30} />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (isError || !sensor) {
    return (
      <AdminLayout className="">
        <div className="p-6 flex h-screen justify-center items-center bg-gray-50">
          <div className="text-center max-w-md bg-white p-8 rounded shadow">
            <h3 className="text-xl font-semibold text-gray-800">Sensor Not Found</h3>
            <p className="mt-2 text-gray-500">
              The sensor with ID <strong>#{id}</strong> could not be retrieved.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout className="">
      <div
        className="bg-gray-50 py-4 px-10 flex items-center space-x-2 hover:text-blue-600 cursor-pointer"
        onClick={() => navigate("/admin/sensor")}
      >
        <RxArrowLeft />
        <p className="text-slate-500 hover:text-blue-600">Back To Sensors</p>
      </div>

      <div className="p-6 flex justify-center bg-gray-50">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-lg w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                {sensor.sensorType.name} Sensor
              </h2>
              <p className="text-blue-100 text-sm">ID: #{sensor.id}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-white text-sm flex items-center ${
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
            </span>
          </div>

          {/* Main Info */}
          <div className="px-6 py-4 space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Sensor Details
              </h3>
              <div className="grid grid-cols-2 gap-y-3 text-sm bg-gray-50 p-4 rounded">
                <div className="text-gray-600">Name:</div>
                <div className="text-gray-900 font-medium">{sensor.name}</div>

                <div className="text-gray-600">Location:</div>
                <div className="text-gray-900 font-medium">
                  {sensor.location || "Not specified"}
                </div>

                <div className="text-gray-600">Installed:</div>
                <div className="text-gray-900 font-medium">
                  {new Date(sensor.createdAt || "").toLocaleString()}
                </div>

                <div className="text-gray-600">Last Updated:</div>
                <div className="text-gray-900 font-medium">
                  {sensor.updatedAt
                    ? new Date(sensor.updatedAt).toLocaleString()
                    : "N/A"}
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Battery Info
              </h3>
              <div className="bg-gray-50 p-4 rounded text-sm text-gray-600">
                Battery level data is not available.
              </div>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium">
              View Details
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm font-medium">
              Edit Sensor
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Sensor;
