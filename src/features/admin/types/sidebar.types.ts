

export interface MenuItem {
  id: number;
  name: string;
  href: string;
  icon: JSX.Element;
}

export interface SidebarProps {
  onLogout?: () => void;
  defaultCollapsed?: boolean;
}

export interface MenuItemProps {
  item: MenuItem;
  isCollapsed: boolean;
}

export interface LogoutButtonProps {
  isCollapsed: boolean;
  onLogout?: () => void;
}
