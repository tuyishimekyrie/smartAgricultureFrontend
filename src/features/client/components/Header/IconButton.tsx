import { FC, ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  badge?: number;
  onClick?: () => void;
}

export const IconButton: FC<IconButtonProps> = ({ icon, badge, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="text-gray-600 hover:text-gray-900">
        {icon}
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
          rounded-full w-5 h-5 flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
};