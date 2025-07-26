import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/layouts";
import { api } from "@/lib/axiosInstance";
import Skeleton from "react-loading-skeleton";
import { useCallback } from "react";

interface Sensor {
  id: number;
  location: string;
  name: string;
  sensorType: string;
  username: string;
  status: string;
}

const fetchSensors = async (): Promise<Sensor[]> => {
  const response = await api.get("/api/sensor/all");
  return response.data;
};

const SensorRowSkeleton = ({ index }: { index: number }) => (
  <tr className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
    <td className="p-3"><Skeleton height={20} /></td>
    <td className="p-3"><Skeleton height={20} width={60} /></td>
    <td className="p-3"><Skeleton height={20} /></td>
    <td className="p-3"><Skeleton height={20} /></td>
    <td className="p-3"><Skeleton height={24} width={80} /></td>
  </tr>
);

const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status.toLowerCase() === "active";
  return (
    <span
      className={`px-3 py-1 text-sm font-medium text-white rounded-full ${
        isActive ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {status}
    </span>
  );
};

const ErrorMessage = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="text-red-500 mb-4">
      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-gray-600">{error}</p>
    </div>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const EmptyState = () => (
  <tr>
    <td colSpan={5}>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No sensors found</h3>
        <p className="text-gray-500">No sensors have been registered yet.</p>
      </div>
    </td>
  </tr>
);

const SensorRow = ({ sensor, index, onClick }: {
  sensor: Sensor;
  index: number;
  onClick: () => void;
}) => (
  <tr
    onClick={onClick}
    className={`border-b cursor-pointer ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50`}
    tabIndex={0}
    role="button"
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <td className="p-3 font-medium">{sensor.sensorType}</td>
    <td className="p-3 text-gray-600">{sensor.id}</td>
    <td className="p-3">{sensor.username}</td>
    <td className="p-3 text-gray-600">{sensor.location}</td>
    <td className="p-3">
      <StatusBadge status={sensor.status} />
    </td>
  </tr>
);

const Sensors = () => {
  const navigate = useNavigate();

  const {
    data: sensors = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Sensor[]>({
    queryKey: ["sensors"],
    queryFn: fetchSensors,
  });

  const handleSensorClick = useCallback(
    (sensorId: number) => {
      navigate(`/admin/sensor/${sensorId}`);
    },
    [navigate]
  );

  return (
    <AdminLayout className="">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">All Sensors</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {sensors.length} sensor{sensors.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {isError ? (
          <ErrorMessage error={(error as Error)?.message || "Failed to load sensors"} onRetry={refetch} />
        ) : (
          <div className="overflow-x-auto shadow-sm rounded-lg">
            <table className="w-full border border-gray-200 bg-white">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-left border-b border-gray-200">
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Customer Name</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <SensorRowSkeleton key={index} index={index} />
                  ))}
                {!isLoading && sensors.length === 0 && <EmptyState />}
                {!isLoading &&
                  sensors.map((sensor, index) => (
                    <SensorRow
                      key={sensor.id}
                      sensor={sensor}
                      index={index}
                      onClick={() => handleSensorClick(sensor.id)}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Sensors;
