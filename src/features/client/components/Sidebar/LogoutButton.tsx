import { AiOutlineLogout } from 'react-icons/ai';
import { LogoutButtonProps } from '../../types/sidebar.types';

export const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  isCollapsed, 
  onLogout 
}) => {
  return (
    <button
      onClick={onLogout}
      className="w-full flex items-center space-x-4 px-2 py-3 rounded-md
        hover:bg-red-500 hover:text-white transition-all cursor-pointer"
    >
      <span className={isCollapsed ? 'mx-auto' : ''}>
        <AiOutlineLogout className="w-6 h-6" />
      </span>
      {!isCollapsed && <span className="text-md">Logout</span>}
    </button>
  );
};