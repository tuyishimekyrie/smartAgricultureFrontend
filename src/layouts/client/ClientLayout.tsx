import { ReactNode } from "react";
import { Sidebar } from "../../features/client/components/Sidebar";
import { Header } from "../../features/client/components/Header";
import profile from "../../assets/profile.jpg";
import { useNavigate } from "react-router-dom";

const ClientLayout = ({ children,className }: { children: ReactNode,className?:string }) => {
    const navigate = useNavigate()
  function handleSettingsClick(): void {
    // throw new Error("Function not implemented.");
  }

  function handleNotificationsClick(): void {
    // throw new Error("Function not implemented.");
  }

  function handleProfileClick(): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <div className={`flex ${className}`}>
      <Sidebar onLogout={() => navigate("/auth/login") }/>{" "}
      <div className="w-full">
        <Header
          title="Dashboard"
          profile={{
            name: "Kyrie",
            greeting: "Hello",
            avatarUrl: profile,
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

export default ClientLayout;
