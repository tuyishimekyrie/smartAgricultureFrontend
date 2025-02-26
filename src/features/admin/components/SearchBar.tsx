import { Search } from 'lucide-react';
import React, { useState } from 'react'

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [inputValue, setInputValue] = useState("");
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(inputValue);
    };
    
    return (
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute left-0 top-0 h-full px-3 flex items-center text-gray-500 hover:text-gray-700"
        >
          <Search size={16} />
        </button>
      </form>
    );
  };

export default SearchBar