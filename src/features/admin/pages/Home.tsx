import React from "react";
import { AdminLayout } from "../../../layouts/admin/index";
import { LineChart, SensorsProgress } from "../components";
import MyMap from "../components/MyMap";

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <AdminLayout className="p-2">
      <header className="ml-6">
        <h1 className="text-2xl font-semibold text-blue-600 mb-2">Overview</h1>
        <p className="text-sm text-gray-600">Sensors Dashboard</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <LineChart className="w-full h-full min-h-[400px]" />
        </div>

        <div className="lg:col-span-1">
          <SensorsProgress />
        </div>
      </div>

      <MyMap center={[-1.9557, 30.1041]} zoom={15} className="mt-4" />
    </AdminLayout>
  );
};

export default Home;
