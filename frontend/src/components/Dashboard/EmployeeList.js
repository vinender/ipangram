import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = ({ employees, onAssignDepartment }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {employees.map((employee) => (
      <div key={employee._id} className="bg-white shadow-md rounded-lg p-4">
        <h3 className="font-semibold text-lg">{employee.userName}</h3>
        <p>{employee.email}</p>
        <p>{employee.location}</p>
        {employee.department && <p>Department: {employee.department}</p>}
        <Link 
          to={`/employee/${employee._id}`} 
          className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </Link>
        <button
          onClick={() => onAssignDepartment(employee)}
          className="mt-2 ml-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Assign Department
        </button>
      </div>
    ))}
  </div>
);

export default React.memo(EmployeeList);