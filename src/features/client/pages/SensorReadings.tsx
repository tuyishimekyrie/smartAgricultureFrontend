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
import { v4 as uuidv4 } from "uuid";

/* ---------- TYPES ---------- */
interface SensorData {
  timestamp: number;
  moisture: number;
  temperature: number;
  ec: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

interface SensorReading extends SensorData {
  id: string;
}

/* ---------- WEBSOCKET HOOK ---------- */
const useWebSocket = (url: string) => {
  const [data, setData] = useState<SensorReading | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "reconnecting"
  >("disconnected");
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    if (!url) return;

    setConnectionStatus((prev) =>
      prev === "connected" ? "connected" : "connecting"
    );
    setError(null);

    try {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => setConnectionStatus("connected");

      wsRef.current.onmessage = (event) => {
        try {
          const sensorData = JSON.parse(event.data);
          setData({
            moisture: sensorData.moisture ?? 0,
            temperature: sensorData.temperature ?? 0,
            ec: sensorData.ec ?? 0,
            ph: sensorData.ph ?? 0,
            nitrogen: sensorData.nitrogen ?? 0,
            phosphorus: sensorData.phosphorus ?? sensorData.phosphorous ?? 0,
            potassium: sensorData.potassium ?? 0,
            id: `reading-${uuidv4()}`,
            timestamp: Date.now(),
          });
        } catch {
          console.log("error")
        }
      };

      wsRef.current.onclose = () => {
        setConnectionStatus("reconnecting");
        reconnectTimeoutRef.current = setTimeout(connect, 2000);
      };

      wsRef.current.onerror = () => {
        setError("WebSocket error");
        setConnectionStatus("reconnecting");
        reconnectTimeoutRef.current = setTimeout(connect, 2000);
      };
    } catch (err) {
      setError(String(err));
      setConnectionStatus("reconnecting");
      reconnectTimeoutRef.current = setTimeout(connect, 2000);
    }
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connect]);

  return { data, connectionStatus, error };
};

/* ---------- HELPERS ---------- */
const getStatusColor = (value: number, type: string): string => {
  const ranges = {
    moisture: { low: 30, high: 70 },
    temperature: { low: 20, high: 30 },
    ph: { low: 6.0, high: 7.5 },
    ec: { low: 800, high: 1200 },
  };
  const range = ranges[type as keyof typeof ranges];
  if (!range) return "text-gray-600";
  return value < range.low || value > range.high
    ? "text-red-500"
    : "text-green-500";
};

const formatValue = (value: number, decimals = 1) =>
  value == null ? "--" : value.toFixed(decimals);

/* ---------- COMPONENTS ---------- */
const SensorCard: React.FC<{
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: string;
  decimals?: number;
}> = ({ title, value, unit, icon, status, decimals = 1 }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-blue-50 rounded-xl">{icon}</div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div
        className={`w-3 h-3 rounded-full ${
          status.includes("green")
            ? "bg-green-400"
            : status.includes("red")
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
    reconnecting: {
      color: "bg-orange-500",
      text: "Reconnecting...",
      pulse: "animate-pulse",
    },
    disconnected: { color: "bg-red-500", text: "Disconnected", pulse: "" },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] ||
    statusConfig.disconnected;

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className={`w-3 h-3 rounded-full ${config.color} ${config.pulse}`} />
      <span className="text-sm font-medium text-gray-600">{config.text}</span>
      {error && <span className="text-sm text-red-500">({error})</span>}
    </div>
  );
};

/* ---------- MAIN COMPONENT ---------- */
const socketURI = import.meta.env.VITE_socketURI;

const SensorReadings: React.FC = () => {
  const { data, connectionStatus, error } = useWebSocket(socketURI);
  const [readings, setReadings] = useState<SensorReading[]>([]);

  useEffect(() => {
    if (data) setReadings((prev) => [data, ...prev].slice(0, 10));
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
    id: uuidv4(),
  };

  const sensorConfigs = [
    {
      title: "Soil Moisture",
      value: currentReading.moisture,
      unit: "%",
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      status: getStatusColor(currentReading.moisture, "moisture"),
    },
    {
      title: "Temperature",
      value: currentReading.temperature,
      unit: "°C",
      icon: <Thermometer className="w-5 h-5 text-red-600" />,
      status: getStatusColor(currentReading.temperature, "temperature"),
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
    <ClientLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
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

          {/* SENSOR CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {sensorConfigs.map((sensor, i) => (
              <SensorCard key={i} {...sensor} />
            ))}
          </div>

          {/* RECENT READINGS TABLE */}
          {readings.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">
                  Recent Readings
                </h2>
              </div>
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      {[
                        "Time",
                        "Moisture (%)",
                        "Temp (°C)",
                        "EC (μS/cm)",
                        "pH",
                        "N (mg/kg)",
                        "P (mg/kg)",
                        "K (mg/kg)",
                      ].map((head) => (
                        <th
                          key={head}
                          className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {readings.map((r) => (
                      <tr
                        key={r.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-3 text-gray-500">
                          {new Date(r.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-3">{formatValue(r.moisture)}</td>
                        <td className="px-6 py-3">
                          {formatValue(r.temperature)}
                        </td>
                        <td className="px-6 py-3">{r.ec}</td>
                        <td className="px-6 py-3">{formatValue(r.ph)}</td>
                        <td className="px-6 py-3">{r.nitrogen}</td>
                        <td className="px-6 py-3">{r.phosphorus}</td>
                        <td className="px-6 py-3">{r.potassium}</td>
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
