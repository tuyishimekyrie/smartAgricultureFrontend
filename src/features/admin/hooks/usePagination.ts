import { useState } from "react";

export const usePagination = <T,>(items: T[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const getCurrentItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return items.slice(startIndex, startIndex + itemsPerPage);
    };
    
    return {
      currentPage,
      setCurrentPage,
      totalPages,
      totalItems,
      getCurrentItems,
      nextPage: () => {
        if (currentPage < totalPages) {
          setCurrentPage(prev => prev + 1);
        }
      },
      prevPage: () => {
        if (currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
      }
    };
  };