import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import http from '../utils/http';


const DepartmentEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchDepartmentEmployees = async () => {
        try {
          setLoading(true);
          const [departmentResponse, employeesResponse] = await Promise.all([
            http.get(`/departments/${id}`),
            http.get(`/departments/${id}/employees`)
          ]);
          setDepartment(departmentResponse.data);
          setEmployees(employeesResponse.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching department employees');
          setLoading(false);
        }
      };
      fetchDepartmentEmployees();
    }, [id]);
  
    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;
  
    return (
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Employees in {department?.name}</h1>
          <button 
            onClick={() => navigate('/details')} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Back to Details
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees?.map((employee) => (
            <div key={employee._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">{employee.userName}</div>
                <p className="text-gray-700 text-base mb-2">
                  <span className="font-semibold">Email:</span> {employee.email}
                </p>
                <p className="text-gray-700 text-base">
                  <span className="font-semibold">Location:</span> {employee.location}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {department?.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DepartmentEmployees;