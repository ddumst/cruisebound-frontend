import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="p-2 rounded disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <FiChevronLeft className="text-blue-600 disabled:text-gray-600" />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page ? "bg-blue-500 text-white font-bold" : "bg-white text-gray-700"
          }`}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        className="p-2 rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        <FiChevronRight className="text-blue-600 disabled:text-gray-600" />
      </button>
    </div>
  );
};

export default Pagination;
