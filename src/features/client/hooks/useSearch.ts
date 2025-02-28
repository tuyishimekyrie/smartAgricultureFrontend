import { useState } from "react";

/**
 * A custom hook for searching through a collection of items.
 * 
 * @template T - The type of items being searched through
 * @param items - The array of items to search
 * @param searchKeys - The keys of T to search within
 * @returns An object containing the search query, a setter for the search query, and a function to get filtered items
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSearch = <T extends Record<string, any>>(
  items: T[], 
  searchKeys: (keyof T)[]
) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const filteredItems = (): T[] => {
    if (!searchQuery.trim()) return items;
    
    const lowercasedQuery = searchQuery.toLowerCase();
    
    return items.filter((item: T) =>
      searchKeys.some((key: keyof T) =>
        String(item[key]).toLowerCase().includes(lowercasedQuery)
      )
    );
  };
  
  return { 
    searchQuery, 
    setSearchQuery, 
    filteredItems 
  };
};