// components/Modal/AssignDepartmentModal.js
import React from 'react';

const AssignDepartmentModal = ({ employee, departments, onAssign, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <h3 className="text-lg font-semibold mb-4">
        Assign Department to {employee.userName}
      </h3>
      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => onAssign(employee._id, e.target.value)}
      >
        <option value="">Select a department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>
      <button
        onClick={onClose}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default React.memo(AssignDepartmentModal);