import { AdminLayout } from "../../../layouts/admin";
import { AllMap } from "../components";


const Map = () => {
  return (
    <AdminLayout className="px-4">
      <p className="text-4xl font-bold">Map</p>
      <div className="h-full py-4">
        <AllMap className="  h-[80vh]" />
      </div>
    </AdminLayout>
  );
};

export default Map;
