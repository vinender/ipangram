import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import http from '../utils/http';
 
const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await http.get(`/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/dashboard" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{employee.userName}</h2>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Location:</strong> {employee.location}</p>
        <p><strong>Department:</strong> {employee.department || 'Not assigned'}</p>
       </div>
    </div>
  );
};

export default EmployeeDetails;