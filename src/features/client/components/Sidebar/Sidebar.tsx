import { useState, useEffect } from 'react';
import { SiSmartthings } from 'react-icons/si';
import { FiSidebar } from 'react-icons/fi';
import { useWindowSize } from '../../hooks';
import { LogoutButton } from './LogoutButton';
import { SidebarProps } from '../../types';
import { MENU_ITEMS } from '../../constants';
import { MenuLink } from './MenuLinks';

export const Sidebar: React.FC<SidebarProps> = ({ 
  onLogout,
  defaultCollapsed = false,
}) => {
  const { width } = useWindowSize();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  useEffect(() => {
    setIsCollapsed(width <= 624);
  }, [width]);

  console.log(MENU_ITEMS)

  return (
    <div
      className={`min-h-screen py-4 bg-slate-100/50 transition-all duration-300 ${
        isCollapsed ? 'w-20 px-2' : 'w-56 px-4'
      }`}
    >
      <div className="flex justify-between items-center">
        <SiSmartthings className="w-12 h-12 text-green-600" />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-blue-100 transition-colors"
        >
          <FiSidebar className="w-6 h-6 hover:text-green-600" />
        </button>
      </div>

      <nav className="my-16 flex flex-col gap-4">
        {MENU_ITEMS.map((item) => (
          <MenuLink
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <LogoutButton
        isCollapsed={isCollapsed}
        onLogout={onLogout}
      />
    </div>
  );
};