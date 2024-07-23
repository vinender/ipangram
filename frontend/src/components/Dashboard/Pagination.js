// components/Dashboard/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="mt-4 flex justify-between items-center">
    <button 
      onClick={() => onPageChange(currentPage - 1)} 
      disabled={currentPage === 1}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
    >
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button 
      onClick={() => onPageChange(currentPage + 1)} 
      disabled={currentPage === totalPages}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
    >
      Next
    </button>
  </div>
);

export default React.memo(Pagination);