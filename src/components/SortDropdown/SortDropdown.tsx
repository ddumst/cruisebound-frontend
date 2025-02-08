import React from "react";

interface SortDropdownProps {
  sortType: string;
  onSortChange: (newSort: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortType, onSortChange }) => {
  return (
    <div className="relative inline-block text-left">
      <select
        className="block w-36 px-3 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={sortType}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="price-low-to-high">Price (Lowest first)</option>
        <option value="price-high-to-low">Price (Highest first)</option>
        <option value="departure-date-close-to-now">Departure date (Closest first)</option>
        <option value="departure-date-far-to-now">Departure date (Farthest first)</option>
        <option value="duration-low-to-high">Duration (Shortest first)</option>
        <option value="duration-high-to-low">Duration (Longest first)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
