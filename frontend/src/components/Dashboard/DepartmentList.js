
// components/Dashboard/DepartmentList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DepartmentList = ({ departments, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <ul>
      {departments.map((dept) => (
        <li key={dept._id} className="flex items-center mb-2">
          <span className="hover:bg-gray-100 p-3 rounded-lg text-lg text-gray-600 flex-grow">{dept.name}</span>
          <button onClick={() => navigate(`/department-employees/${dept._id}`)} className="bg-green-600 text-white px-4 py-2 rounded mr-2">View</button>
          <button onClick={() => onEdit(dept)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
          <button onClick={() => onDelete(dept._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(DepartmentList);