import React, { useEffect, useState, useCallback } from "react";
import { FcChargeBattery } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast, Toaster } from "sonner";
import ClientLayout from "@/layouts/client/ClientLayout";
import { api } from "@/lib/axiosInstance";

// ============================================================================
// Type Definitions
// ============================================================================

interface User {
  id: string;
  email: string;
  role: string;
}

interface Sensor {
  id: number;
  name: string;
  location: string;
  sensorType: string;
  userId: number;
  // Optional fields that might be added later
  status?: string;
  battery?: string;
  installationDate?: string;
  lastActivity?: string;
}

interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  errorCode: string | null;
  data: T | null;
  details: any;
}

interface ApiError {
  message: string;
  status?: number;
  errorCode?: string;
}

// ============================================================================
// Skeleton Components
// ============================================================================

const TableRowSkeleton: React.FC = () => (
  <tr className="border-b bg-white animate-pulse">
    {Array.from({ length: 4 }).map((_, index) => (
      <td key={index} className="p-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

const TableSkeleton: React.FC = () => (
  <div className="overflow-x-auto">
    <table className="w-full border border-gray-200 rounded-lg shadow-md bg-white">
      <thead>
        <tr className="bg-gray-100 text-gray-700 text-left">
          <th className="p-3 border-b">Sensor Name</th>
          <th className="p-3 border-b">Type</th>
          <th className="p-3 border-b">Location</th>
          <th className="p-3 border-b">ID</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRowSkeleton key={index} />
        ))}
      </tbody>
    </table>
  </div>
);

const EmptyState: React.FC = () => (
  <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
    <div className="mb-4">
      <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No sensors found</h3>
    <p className="text-gray-500 max-w-sm mx-auto">
      You don't have any sensors registered yet. Contact support to get started with sensor monitoring.
    </p>
  </div>
);

// ============================================================================
// Sensor Type Badge Component
// ============================================================================

interface SensorTypeBadgeProps {
  sensorType: string;
}

const SensorTypeBadge: React.FC<SensorTypeBadgeProps> = ({ sensorType }) => {
  const getTypeStyles = (type: string) => {
    const normalizedType = type.toLowerCase();
    if (normalizedType.includes('temperature')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (normalizedType.includes('humidity')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    if (normalizedType.includes('motion') || normalizedType.includes('movement')) {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    }
    if (normalizedType.includes('light')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    if (normalizedType.includes('pressure')) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full border ${getTypeStyles(sensorType)}`}
    >
      {sensorType}
    </span>
  );
};

// ============================================================================
// Location Badge Component
// ============================================================================

interface LocationBadgeProps {
  location: string;
}

const LocationBadge: React.FC<LocationBadgeProps> = ({ location }) => {
  return (
    <div className="flex items-center space-x-1 text-gray-600">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span className="text-sm font-medium">{location}</span>
    </div>
  );
};

// ============================================================================
// Custom Hooks
// ============================================================================

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const decoded = jwtDecode<User>(token);
      if (!decoded.id) {
        throw new Error("Invalid token: missing user ID");
      }
      
      setUser(decoded);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed";
      setAuthError(errorMessage);
      toast.error("Authentication error. Please log in again.");
    }
  }, []);

  return { user, authError };
};

const useSensors = (userId: string | null) => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSensors = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get<ApiResponse<Sensor[]>>(`api/sensor/user/${userId}`);
      
      // Handle API response structure
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch sensors');
      }

      const sensorsData = response.data.data || [];
      
      if (sensorsData.length === 0) {
        setSensors([]);
        toast.info("No sensors found", {
          description: "You don't have any sensors registered to your account yet."
        });
        return;
      }

      setSensors(sensorsData);
      toast.success(`Found ${sensorsData.length} sensor${sensorsData.length > 1 ? 's' : ''}`, {
        description: `Successfully loaded sensor data for your account`
      });
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.details ||
                          error.message || 
                          "Failed to fetch sensors";
      
      setError(errorMessage);
      setSensors([]);
      
      toast.error("Failed to load sensors", {
        description: errorMessage,
        action: {
          label: "Retry",
          onClick: () => fetchSensors()
        }
      });
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSensors();
  }, [fetchSensors]);

  return { sensors, loading, error, refetch: fetchSensors };
};

// ============================================================================
// Main Component
// ============================================================================

const Sensors: React.FC = () => {
  const navigate = useNavigate();
  const { user, authError } = useAuth();
  const { sensors, loading, error, refetch } = useSensors(user?.id || null);

  // Handle authentication errors
  useEffect(() => {
    if (authError) {
      navigate('/login');
    }
  }, [authError, navigate]);

  const handleSensorClick = useCallback((sensorId: number) => {
    navigate(`/client/sensor/${sensorId}`);
  }, [navigate]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (authError) {
    return null; // Will redirect to login
  }

  return (
    <ClientLayout className="">
      <Toaster 
        position="top-right"
        richColors
        closeButton
        expand={false}
        toastOptions={{
          duration: 4000,
        }}
      />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sensor Dashboard</h2>
            <p className="text-gray-600 mt-1">
              Monitor and manage your IoT sensors
            </p>
          </div>
          
          {!loading && sensors.length > 0 && (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Total: <span className="font-medium text-gray-900">{sensors.length}</span>
              </div>
              <button
                onClick={handleRetry}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 
                         border border-blue-200 hover:border-blue-300 rounded-lg 
                         transition-colors duration-200"
              >
                Refresh
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && <TableSkeleton />}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Unable to load sensors
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                       transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && sensors.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Sensor Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Sensor ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sensors.map((sensor, index) => (
                  <tr
                    key={sensor.id}
                    onClick={() => handleSensorClick(sensor.id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150 
                             focus:outline-none focus:bg-gray-50"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSensorClick(sensor.id);
                      }
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {sensor.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            User ID: {sensor.userId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <SensorTypeBadge sensorType={sensor.sensorType} />
                    </td>
                    <td className="px-6 py-4">
                      <LocationBadge location={sensor.location} />
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-700">
                      #{sensor.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sensors.length === 0 && <EmptyState />}
      </div>
    </ClientLayout>
  );
};

export default Sensors;