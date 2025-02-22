import { Header } from "../../features/admin/components";
import { Sidebar } from "../../features/admin/components/Sidebar";
import { adminLayoutProps } from "./types";
import profileImage from "../../assets/profile.jpg";

const AdminLayout: React.FC<adminLayoutProps> = ({ children }) => {
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
    <div className="flex">
      <Sidebar />{" "}
      <div className="w-full">
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
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
