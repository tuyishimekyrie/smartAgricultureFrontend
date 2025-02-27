import { Header } from "../../features/admin/components";
import { Sidebar } from "../../features/admin/components/Sidebar";
import { adminLayoutProps } from "./types";
import profileImage from "../../assets/profile.jpg";
import { useNavigate } from "react-router-dom";

const AdminLayout: React.FC<adminLayoutProps> = ({ children, className }) => {
  const navigate = useNavigate();
  function handleSettingsClick(): void {
    //
  }

  function handleNotificationsClick(): void {
    //
  }

  function handleProfileClick(): void {
    //
  }

  return (
    <div className="flex overflow-hidden max-h-screen">
      <Sidebar onLogout={() => navigate("/auth/login")}/>{" "}
      <div className="w-full overflow-y-auto">
        <Header
          title="Dashboard"
          profile={{
            name: "Kyrie",
            greeting: "Hello",
            avatarUrl: profileImage,
          }}
          notificationCount={3}
          onSettingsClick={handleSettingsClick}
          onNotificationsClick={handleNotificationsClick}
          onProfileClick={handleProfileClick}
        />
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
