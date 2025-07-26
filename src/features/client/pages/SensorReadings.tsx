import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Activity,
  Thermometer,
  Droplets,
  Zap,
  TestTube,
  Leaf,
} from "lucide-react";
import ClientLayout from "@/layouts/client/ClientLayout";

// Types for sensor data
interface SensorData {
  timestamp: number;
  moisture: number; // %
  temperature: number; // °C
  ec: number; // μS/cm
  ph: number; // pH
  nitrogen: number; // mg/kg
  phosphorus: number; // mg/kg
  potassium: number; // mg/kg
}

interface SensorReading extends SensorData {
  id: string;
}

// Custom hook for WebSocket connection with reconnection logic
const useWebSocket = (url: string) => {
  const [data, setData] = useState<SensorReading | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("disconnected");
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  console.log(url);

  const connect = useCallback(() => {
    try {
      setConnectionStatus("connecting");
      setError(null);

      // For demo purposes, we'll simulate WebSocket with mock data
      // Replace with: wsRef.current = new WebSocket(url);

      // Mock WebSocket simulation
      const mockConnect = () => {
        setConnectionStatus("connected");
        reconnectAttempts.current = 0;

        // Simulate receiving data every 2 seconds
        const interval = setInterval(() => {
          const mockData: SensorReading = {
            id: `reading-${Date.now()}`,
            timestamp: Date.now(),
            moisture: Math.round((20 + Math.random() * 60) * 10) / 10,
            temperature: Math.round((18 + Math.random() * 15) * 10) / 10,
            ec: Math.round(800 + Math.random() * 400),
            ph: Math.round((6 + Math.random() * 2) * 10) / 10,
            nitrogen: Math.round(50 + Math.random() * 200),
            phosphorus: Math.round(20 + Math.random() * 80),
            potassium: Math.round(100 + Math.random() * 300),
          };
          setData(mockData);
        }, 2000);

        // Simulate occasional disconnection for demo
        setTimeout(() => {
          clearInterval(interval);
          if (reconnectAttempts.current < maxReconnectAttempts) {
            setConnectionStatus("disconnected");
            reconnectAttempts.current++;
            reconnectTimeoutRef.current = setTimeout(connect, 2000);
          }
        }, 30000);
      };

      setTimeout(mockConnect, 1000);

      // Real WebSocket implementation would be:
      /*
      wsRef.current.onopen = () => {
        setConnectionStatus('connected');
        reconnectAttempts.current = 0;
      };

      wsRef.current.onmessage = (event) => {
        try {
          const sensorData = JSON.parse(event.data);
          setData({
            ...sensorData,
            id: `reading-${Date.now()}`,
            timestamp: Date.now()
          });
        } catch (err) {
          console.error('Failed to parse sensor data:', err);
        }
      };

      wsRef.current.onclose = () => {
        setConnectionStatus('disconnected');
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          reconnectTimeoutRef.current = setTimeout(connect, 2000 * reconnectAttempts.current);
        }
      };

      wsRef.current.onerror = (error) => {
        setError(`WebSocket error: ${error}`);
        setConnectionStatus('disconnected');
      };
      */
    } catch (err) {
      setError(`Connection failed: ${err}`);
      setConnectionStatus("disconnected");
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { data, connectionStatus, error, reconnect: connect };
};

// Utility functions
const getStatusColor = (value: number, type: string): string => {
  const ranges = {
    moisture: { low: 30, high: 70 },
    temperature: { low: 20, high: 30 },
    ph: { low: 6.0, high: 7.5 },
    ec: { low: 800, high: 1200 },
  };

  const range = ranges[type as keyof typeof ranges];
  if (!range) return "text-gray-600";

  if (value < range.low || value > range.high) return "text-red-500";
  return "text-green-500";
};

const formatValue = (value: number, decimals: number = 1): string => {
  return value.toFixed(decimals);
};

// Sensor card component
const SensorCard: React.FC<{
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: string;
  decimals?: number;
}> = ({ title, value, unit, icon, status, decimals = 1 }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div
        className={`w-3 h-3 rounded-full ${
          status === "text-green-500"
            ? "bg-green-400"
            : status === "text-red-500"
            ? "bg-red-400"
            : "bg-gray-400"
        }`}
      />
    </div>
    <div className="flex items-baseline space-x-1">
      <span className={`text-2xl font-bold ${status}`}>
        {formatValue(value, decimals)}
      </span>
      <span className="text-sm text-gray-500">{unit}</span>
    </div>
  </div>
);

// Connection status indicator
const ConnectionStatus: React.FC<{ status: string; error?: string | null }> = ({
  status,
  error,
}) => {
  const statusConfig = {
    connected: { color: "bg-green-500", text: "Connected", pulse: "" },
    connecting: {
      color: "bg-yellow-500",
      text: "Connecting...",
      pulse: "animate-pulse",
    },
    disconnected: { color: "bg-red-500", text: "Disconnected", pulse: "" },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] ||
    statusConfig.disconnected;

  return (
    <div className="flex items-center space-x-2 mb-6">
      <div className={`w-3 h-3 rounded-full ${config.color} ${config.pulse}`} />
      <span className="text-sm font-medium text-gray-600">{config.text}</span>
      {error && <span className="text-sm text-red-500">({error})</span>}
    </div>
  );
};

// Main component
const SensorReadings: React.FC = () => {
  const { data, connectionStatus, error } = useWebSocket(
    "ws://your-device-ip:port"
  );
  const [readings, setReadings] = useState<SensorReading[]>([]);

  // Store readings history (last 10 readings)
  useEffect(() => {
    if (data) {
      setReadings((prev) => {
        const newReadings = [data, ...prev].slice(0, 10);
        return newReadings;
      });
    }
  }, [data]);

  const currentReading = data || {
    moisture: 0,
    temperature: 0,
    ec: 0,
    ph: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    timestamp: Date.now(),
  };

  const sensorConfigs = [
    {
      title: "Soil Moisture",
      value: currentReading.moisture,
      unit: "%",
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      status: getStatusColor(currentReading.moisture, "moisture"),
      decimals: 1,
    },
    {
      title: "Temperature",
      value: currentReading.temperature,
      unit: "°C",
      icon: <Thermometer className="w-5 h-5 text-red-600" />,
      status: getStatusColor(currentReading.temperature, "temperature"),
      decimals: 1,
    },
    {
      title: "Electrical Conductivity",
      value: currentReading.ec,
      unit: "μS/cm",
      icon: <Zap className="w-5 h-5 text-yellow-600" />,
      status: getStatusColor(currentReading.ec, "ec"),
      decimals: 0,
    },
    {
      title: "pH Level",
      value: currentReading.ph,
      unit: "pH",
      icon: <TestTube className="w-5 h-5 text-purple-600" />,
      status: getStatusColor(currentReading.ph, "ph"),
      decimals: 1,
    },
    {
      title: "Nitrogen",
      value: currentReading.nitrogen,
      unit: "mg/kg",
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      status: "text-gray-600",
      decimals: 0,
    },
    {
      title: "Phosphorus",
      value: currentReading.phosphorus,
      unit: "mg/kg",
      icon: <Leaf className="w-5 h-5 text-orange-600" />,
      status: "text-gray-600",
      decimals: 0,
    },
    {
      title: "Potassium",
      value: currentReading.potassium,
      unit: "mg/kg",
      icon: <Leaf className="w-5 h-5 text-indigo-600" />,
      status: "text-gray-600",
      decimals: 0,
    },
  ];

  return (
    <ClientLayout className="">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Soil Sensor Dashboard
              </h1>
            </div>

            <ConnectionStatus status={connectionStatus} error={error} />

            {data && (
              <p className="text-sm text-gray-500">
                Last updated:{" "}
                {new Date(currentReading.timestamp).toLocaleString()}
              </p>
            )}
          </div>

          {/* Sensor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {sensorConfigs.map((sensor, index) => (
              <SensorCard key={index} {...sensor} />
            ))}
          </div>

          {/* Recent Readings Table */}
          {readings.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Recent Readings
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Moisture (%)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Temp (°C)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        EC (μS/cm)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        pH
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N (mg/kg)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        P (mg/kg)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        K (mg/kg)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {readings.map((reading) => (
                      <tr key={reading.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(reading.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatValue(reading.moisture)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatValue(reading.temperature)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {reading.ec}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatValue(reading.ph)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {reading.nitrogen}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {reading.phosphorus}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {reading.potassium}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default SensorReadings;
