import ClientLayout from "@/layouts/client/ClientLayout";


const SensorReadings = () => {
  return (
    <ClientLayout className="">
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Sensor Readings</h1>
            <p className="text-lg">This page will display sensor readings.</p>
        </div>
    </ClientLayout>
  );
};

export default SensorReadings;
