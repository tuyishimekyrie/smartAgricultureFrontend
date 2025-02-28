import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FC } from 'react';

interface LineChartProps {
  className?: string;
}

const LineChart: FC<LineChartProps> = ({ className = '' }) => {
  const mockData = {
    sensors: [10, 15, 12, 18, 20, 22],
    percentages: [65, 70, 68, 75, 80, 82],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  };

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      animations: {
        enabled: true,
        speed: 800
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    title: {
      text: 'Sensor Analytics',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
    xaxis: {
      categories: mockData.months,
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Number of Sensors',
          style: {
            fontSize: '12px'
          }
        },
        labels: {
          formatter: (value) => value.toFixed(0)
        }
      },
      {
        opposite: true,
        title: {
          text: 'Percentage',
          style: {
            fontSize: '12px'
          }
        },
        max: 100,
        labels: {
          formatter: (value) => `${value}%`
        }
      }
    ],
    colors: ['#3B82F6', '#10B981'],
    grid: {
      borderColor: '#f1f1f1',
      padding: {
        bottom: 15
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value, { seriesIndex }) => {
          return seriesIndex === 0 
            ? `${value} sensors`
            : `${value}%`;
        }
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  const series = [
    {
      name: 'Sensors',
      type: 'area',
      data: mockData.sensors
    },
    {
      name: 'Percentage',
      type: 'area',
      data: mockData.percentages
    }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default LineChart;