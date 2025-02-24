import { NavLink, useLocation } from "react-router-dom";
import { MenuItemProps } from "../../types/sidebar.types";

export const MenuLink: React.FC<MenuItemProps> = ({ item, isCollapsed }) => {
  const location = useLocation()
  const isActive = location.pathname === item.href;


  return (
    <NavLink
      to={item.href}
      className={() =>
        `flex items-center space-x-4 px-2 py-4 rounded-md transition-all ${
          isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-600 hover:text-white"
        }`
      }
    >
      <span className={isCollapsed ? "mx-auto" : ""}>{item.icon}</span>
      {!isCollapsed && (
        <span className="text-md whitespace-nowrap">{item.name}</span>
      )}
    </NavLink>
  );
};
