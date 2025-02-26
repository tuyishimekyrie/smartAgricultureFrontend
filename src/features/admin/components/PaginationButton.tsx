import React from 'react'

const PaginationButton = ({ onClick, disabled, children }: { 
    onClick: () => void, 
    disabled?: boolean, 
    children: React.ReactNode 
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center p-2 rounded-md ${
        disabled 
          ? 'text-gray-400 cursor-not-allowed' 
          : 'text-blue-600 hover:bg-blue-50'
      }`}
    >
      {children}
    </button>
  );

export default PaginationButton