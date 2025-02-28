import ClientLayout from "../../../layouts/client/ClientLayout";
import LineChart from "../components/LineChart";
import SensorsProgress from "../components/SensorsProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropletIcon, ThermometerIcon, SunIcon, LeafIcon } from "lucide-react";

const Home = () => {
  // Sample data for demonstration - replace with actual data from your API
  const stats = [
    {
      title: "Active Sensors",
      value: "143/150",
      icon: <DropletIcon className="h-4 w-4 text-blue-500" />,
      description: "95% operational",
      change: "+2%",
      trend: "increase"
    },
    {
      title: "Soil Moisture",
      value: "64%",
      icon: <LeafIcon className="h-4 w-4 text-green-500" />,
      description: "Optimal range",
      change: "-3%",
      trend: "neutral"
    },
    {
      title: "Temperature",
      value: "24°C",
      icon: <ThermometerIcon className="h-4 w-4 text-orange-500" />,
      description: "Average today",
      change: "+2°C",
      trend: "increase"
    },
    {
      title: "Sunlight Hours",
      value: "6.5 hrs",
      icon: <SunIcon className="h-4 w-4 text-yellow-500" />,
      description: "Today's exposure",
      change: "+0.5 hrs",
      trend: "increase"
    }
  ];

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6 p-4">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Farm Dashboard</h1>
            <p className="text-sm text-gray-500">
              Monitor and analyze your agricultural data in real-time
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
              <option>North Field</option>
              <option>South Field</option>
              <option>West Field</option>
            </select>
            <button className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">
              Configure Alerts
            </button>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <span className={`ml-2 text-xs ${
                        stat.trend === "increase" ? "text-green-500" :
                        stat.trend === "decrease" ? "text-red-500" : "text-gray-500"
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
                  </div>
                  <div className="rounded-full bg-gray-100 p-3">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs for different data views */}
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="sensors">Sensor Health</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Field Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart className="h-80 w-full" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Sensor Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <SensorsProgress className="h-80" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sensors" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sensor Network Health</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Detailed sensor information will appear here</p>
                {/* Add sensor health components here */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Personalized recommendations based on your field data will appear here</p>
                {/* Add recommendations components here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Weather and Alerts Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Today's Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">24°C</p>
                  <p className="text-sm text-gray-500">Partly Cloudy</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>Humidity: 65%</p>
                    <p>Wind: 8 km/h</p>
                  </div>
                </div>
                <div className="rounded-full bg-blue-50 p-4">
                  <SunIcon className="h-10 w-10 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-medium">
                <span>Recent Alerts</span>
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-500">2 New</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-yellow-50 p-3">
                  <p className="font-medium text-yellow-800">Low Soil Moisture</p>
                  <p className="text-xs text-yellow-700">Zone B3 - 1 hour ago</p>
                </div>
                <div className="rounded-md bg-red-50 p-3">
                  <p className="font-medium text-red-800">Sensor Malfunction</p>
                  <p className="text-xs text-red-700">Temperature Sensor #42 - 3 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Home;