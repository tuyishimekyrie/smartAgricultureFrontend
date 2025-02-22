import { Sidebar } from "../../features/admin/components/Sidebar";
import { adminLayoutProps } from "./types";

const AdminLayout: React.FC<adminLayoutProps> = ({ children }) => {
  return (
    <div>
      <Sidebar /> <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
