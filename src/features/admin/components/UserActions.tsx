import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react'

const UserActions = ({ userId }: { userId: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const actions = [
      { label: "View Details", onClick: () => console.log(`View user ${userId}`) },
      { label: "Edit User", onClick: () => console.log(`Edit user ${userId}`) },
      { label: "Delete User", onClick: () => console.log(`Delete user ${userId}`) },
    ];
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <MoreHorizontal size={18} />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };
  

export default UserActions