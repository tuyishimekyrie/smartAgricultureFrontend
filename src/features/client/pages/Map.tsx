import ClientLayout from "@/layouts/client/ClientLayout";
import  AllMap  from "../components/AllMap";


const Map = () => {
  return (
    <ClientLayout className="">
      <p className="text-4xl font-bold">Map</p>
      <div className="h-full py-4">
        <AllMap className="  h-[80vh]" />
      </div>
    </ClientLayout>
  );
};

export default Map;
