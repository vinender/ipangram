// components/Dashboard/FilterForm.js
import React from 'react';

const FilterForm = ({ filters, onFilterChange, onApplyFilter, onClearFilters }) => (
  <div className="flex mb-4">
    <input
      type="text"
      value={filters.nameFilter}
      onChange={(e) => onFilterChange('nameFilter', e.target.value)}
      placeholder="Filter by name"
      className="flex-grow mr-2 p-2 border rounded"
    />
    <input
      type="text"
      value={filters.locationFilter}
      onChange={(e) => onFilterChange('locationFilter', e.target.value)}
      placeholder="Filter by location"
      className="flex-grow mr-2 p-2 border rounded"
    />
    <select
      value={filters.sortBy}
      onChange={(e) => onFilterChange('sortBy', e.target.value)}
      className="mr-2 p-2 border rounded"
    >
      <option value="name">Sort by Name</option>
      <option value="location">Sort by Location</option>
    </select>
    <select
      value={filters.order}
      onChange={(e) => onFilterChange('order', e.target.value)}
      className="mr-2 p-2 border rounded"
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <button onClick={onApplyFilter} className="bg-blue-500 text-white px-4 py-2 rounded">
      Apply Filter
    </button>
    <button 
      onClick={onClearFilters} 
      className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
    >
      Clear Filters
    </button>
  </div>
);

export default React.memo(FilterForm);