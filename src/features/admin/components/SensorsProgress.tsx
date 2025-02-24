import React from 'react';

interface SensorData {
  id: number;
  name: string;
  percentage: number;
  color?: string;
}

interface SensorsProgressProps {
  title?: string;
  data?: SensorData[];
  showPercentage?: boolean;
  className?: string;
}

const DEFAULT_SENSOR_DATA: SensorData[] = [
  {
    id: 1,
    name: "PH Sensors",
    percentage: 70,
    color: "#3B82F6" // blue-500
  },
  {
    id: 2,
    name: "Humidity Sensors",
    percentage: 40,
    color: "#10B981" // emerald-500
  },
  {
    id: 3,
    name: "Temperature Sensors",
    percentage: 60,
    color: "#F59E0B" // amber-500
  },
  {
    id: 4,
    name: "Moisture Sensors",
    percentage: 80,
    color: "#6366F1" // indigo-500
  }
];

const ProgressBar: React.FC<{ percentage: number; color?: string }> = ({ 
  percentage, 
  color = "#3B82F6" 
}) => (
  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
    <div 
      className="h-full transition-all duration-300 ease-in-out rounded-full"
      style={{ 
        width: `${percentage}%`,
        backgroundColor: color
      }}
    />
  </div>
);

const SensorsProgress: React.FC<SensorsProgressProps> = ({
  title = "Sensors",
  data = DEFAULT_SENSOR_DATA,
  showPercentage = true,
  className = ""
}) => {
  return (
    <div className={`bg-slate-100  shadow-sm rounded-lg p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      
      <div className="space-y-4">
        {data.map((sensor) => (
          <div key={sensor.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">
                {sensor.name}
              </span>
              {showPercentage && (
                <span className="text-sm text-gray-500">
                  {sensor.percentage}%
                </span>
              )}
            </div>
            
            <ProgressBar 
              percentage={sensor.percentage} 
              color={sensor.color} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};



export default SensorsProgress;