// components/search/sort.tsx

import React from 'react';

const sortOptions = [
  { value: 'amount', label: 'Amount' },
  { value: 'date_posted', label: 'Date Posted' },
  { value: 'date_ending', label: 'Date Ending' },
];

const Sort: React.FC<{ filters: string[]; setFilters: (filters: string[]) => void }> = ({ filters, setFilters }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    // Replace any existing sort option in filters with the new one
    const updatedFilters = filters.filter(filter => !sortOptions.some(option => option.value === filter));
    setFilters([...updatedFilters, selectedValue]); // Set the new sort option
  };

  return (
    <div className="relative inline-block">
      <label htmlFor="sort-select" className="sr-only">Sort By</label>
      <select
        id="sort-select"
        onChange={handleChange}
        className="block w-full rounded-md border-gray-300 text-gray-700 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
      >
        <option value="" disabled selected>Select a sorting option</option> {/* Optional placeholder */}
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
