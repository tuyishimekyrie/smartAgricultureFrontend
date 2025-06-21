import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface SensorData {
  id: number;
  name: string;
  percentage: number;
  color?: string;
  status?: 'healthy' | 'warning' | 'critical';
  lastUpdate?: string;
  trend?: 'up' | 'down' | 'stable';
}

interface SensorsProgressProps {
  title?: string;
  data?: SensorData[];
  showPercentage?: boolean;
  showStatus?: boolean;
  showTrends?: boolean;
  animated?: boolean;
  className?: string;
}

const DEFAULT_SENSOR_DATA: SensorData[] = [
  {
    id: 1,
    name: "pH Sensors",
    percentage: 87,
    color: "#0EA5E9",
    status: 'healthy',
    lastUpdate: '2 min ago',
    trend: 'stable'
  },
  {
    id: 2,
    name: "Humidity Sensors", 
    percentage: 42,
    color: "#10B981",
    status: 'warning',
    lastUpdate: '1 min ago',
    trend: 'down'
  },
  {
    id: 3,
    name: "Temperature Sensors",
    percentage: 76,
    color: "#F97316",
    status: 'healthy',
    lastUpdate: '30 sec ago',
    trend: 'up'
  },
  {
    id: 4,
    name: "Moisture Sensors",
    percentage: 94,
    color: "#8B5CF6",
    status: 'healthy',
    lastUpdate: '45 sec ago',
    trend: 'stable'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy': return 'text-emerald-600';
    case 'warning': return 'text-amber-600';
    case 'critical': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'healthy': return <CheckCircle className="w-4 h-4" />;
    case 'warning': return <AlertTriangle className="w-4 h-4" />;
    case 'critical': return <Activity className="w-4 h-4" />;
    default: return <Activity className="w-4 h-4" />;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return <TrendingUp className="w-3 h-3 text-emerald-500 rotate-0" />;
    case 'down': return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
    default: return <div className="w-3 h-3 rounded-full bg-gray-400" />;
  }
};

const ProgressBar: React.FC<{ 
  percentage: number; 
  color?: string; 
  animated?: boolean;
  status?: string;
}> = ({ percentage, color = "#0EA5E9", animated = true, status }) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDisplayPercentage(percentage), 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayPercentage(percentage);
    }
  }, [percentage, animated]);

  const getBarGradient = () => {
    if (status === 'warning') return 'from-amber-400 to-amber-600';
    if (status === 'critical') return 'from-red-400 to-red-600';
    return 'from-blue-400 to-blue-600';
  };

  return (
    <div className="relative">
      <div className="h-3 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r ${getBarGradient()} shadow-sm relative overflow-hidden`}
          style={{ width: `${displayPercentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
        </div>
      </div>
      
      {/* Glow effect for high values */}
      {percentage > 80 && (
        <div 
          className="absolute top-0 h-3 rounded-full opacity-30 blur-sm -z-10"
          style={{ 
            width: `${displayPercentage}%`,
            backgroundColor: color 
          }}
        />
      )}
    </div>
  );
};

const SensorCard: React.FC<{
  sensor: SensorData;
  showPercentage: boolean;
  showStatus: boolean;
  showTrends: boolean;
  animated: boolean;
}> = ({ sensor, showPercentage, showStatus, showTrends, animated }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group p-4 rounded-xl transition-all duration-300 border border-gray-200/50 hover:border-gray-300/50 hover:shadow-lg hover:shadow-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 ${
        isHovered ? 'scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
            {sensor.name}
          </h3>
          {showStatus && (
            <div className={`flex items-center gap-1 ${getStatusColor(sensor.status || 'healthy')}`}>
              {getStatusIcon(sensor.status || 'healthy')}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {showTrends && getTrendIcon(sensor.trend || 'stable')}
          {showPercentage && (
            <div className="flex flex-col items-end">
              <span className="text-lg font-semibold text-gray-900">
                {sensor.percentage}%
              </span>
              {sensor.lastUpdate && (
                <span className="text-xs text-gray-500">
                  {sensor.lastUpdate}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      <ProgressBar
        percentage={sensor.percentage}
        color={sensor.color}
        animated={animated}
        status={sensor.status}
      />
      
      {/* Status indicator bar */}
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span className="capitalize">
          {sensor.status || 'Active'}
        </span>
        <span>
          {sensor.percentage < 30 ? 'Low' : sensor.percentage < 70 ? 'Normal' : 'High'}
        </span>
      </div>
    </div>
  );
};

const SensorsProgress: React.FC<SensorsProgressProps> = ({
  title = "System Sensors",
  data = DEFAULT_SENSOR_DATA,
  showPercentage = true,
  showStatus = true,
  showTrends = true,
  animated = true,
  className = ""
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  const filteredData = data.filter(sensor => {
    if (selectedFilter === 'all') return true;
    return sensor.status === selectedFilter;
  });

  const getOverallHealth = () => {
    const avgPercentage = data.reduce((sum, sensor) => sum + sensor.percentage, 0) / data.length;
    const healthyCount = data.filter(s => s.status === 'healthy').length;
    const healthPercentage = (healthyCount / data.length) * 100;
    
    return {
      performance: Math.round(avgPercentage),
      health: Math.round(healthPercentage),
      status: healthPercentage > 75 ? 'excellent' : healthPercentage > 50 ? 'good' : 'needs attention'
    };
  };

  const overallHealth = getOverallHealth();

  return (
    <div className={`bg-white shadow-xl rounded-2xl border border-gray-200/50 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-6 border-b border-gray-200/50">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Performance: {overallHealth.performance}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  overallHealth.status === 'excellent' ? 'bg-emerald-500' : 
                  overallHealth.status === 'good' ? 'bg-amber-500' : 'bg-red-500'
                }`}></div>
                <span className="text-gray-600 capitalize">{overallHealth.status}</span>
              </div>
            </div>
          </div>
          
          {/* Filter buttons */}
          <div className="flex gap-1 p-1 bg-white rounded-lg border border-gray-200">
            {['all', 'healthy', 'warning', 'critical'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                  selectedFilter === filter
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sensors Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredData.map((sensor) => (
            <SensorCard
              key={sensor.id}
              sensor={sensor}
              showPercentage={showPercentage}
              showStatus={showStatus}
              showTrends={showTrends}
              animated={animated}
            />
          ))}
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No sensors match the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorsProgress;