import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  label: React.ReactNode;
  value: string;
}

interface SortDropdownProps {
  sortType: string;
  onSortChange: (newSort: string) => void;
}

const options: Option[] = [
  { label: <div className="flex flex-col items-start font-bold">Price <span className="text-xs text-gray-400">Lowest first</span></div>, value: "price-low-to-high" },
  { label: <div className="flex flex-col items-start font-bold">Price <span className="text-xs text-gray-400">Highest first</span></div>, value: "price-high-to-low" },
  { label: <div className="flex flex-col items-start font-bold">Departure date <span className="text-xs text-gray-400">Closest first</span></div>, value: "departure-date-close-to-now" },
  { label: <div className="flex flex-col items-start font-bold">Departure date <span className="text-xs text-gray-400">Farthest first</span></div>, value: "departure-date-far-to-now" },
  { label: <div className="flex flex-col items-start font-bold">Duration <span className="text-xs text-gray-400">Shortest first</span></div>, value: "duration-low-to-high" },
  { label: <div className="flex flex-col items-start font-bold">Duration <span className="text-xs text-gray-400">Longest first</span></div>, value: "duration-high-to-low" },
];

const SortDropdown: React.FC<SortDropdownProps> = ({ sortType, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === sortType);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left w-48" ref={dropdownRef}>
      <button
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.label || "Select an option"}
        <FiChevronDown />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-100 ${
                option.value === sortType ? "font-bold text-blue-600" : ""
              }`}
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
