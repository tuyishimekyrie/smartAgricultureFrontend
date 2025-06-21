import { Header } from "../../features/admin/components";
import { Sidebar } from "../../features/admin/components/Sidebar";
import { adminLayoutProps } from "./types";
import profileImage from "../../assets/profile.jpg";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { DecodedToken } from "@/features/auth/pages/Login";

const AdminLayout: React.FC<adminLayoutProps> = ({ children, className }) => {
  const navigate = useNavigate();
  const [user,setUser] = useState<DecodedToken>()
  function handleSettingsClick(): void {
    //
  }

  function handleNotificationsClick(): void {
    //
  }

  function handleProfileClick(): void {
    //
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
  
      const decode = jwtDecode<DecodedToken>(token);
      console.log("decoded", decode);

      setUser(decode);
    }
  },[]);
  return (
    <div className="flex overflow-hidden">
      <Sidebar onLogout={() => navigate("/auth/login")} />{" "}
      <div className="w-full overflow-y-auto">
        <Header
          title="Dashboard"
          profile={{
            name: user?.email || "Admin",
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
