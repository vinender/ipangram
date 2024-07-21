import React, { useState, useEffect } from 'react';
import axios from 'axios';
import http from '../../utils/http';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [employees, setEmployees] = useState([]);
  const [assigningEmployee, setAssigningEmployee] = useState(null);
   const [editingDepartment, setEditingDepartment] = useState(null);
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');


  useEffect(() => {
    fetchUserData();
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await http.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAssignDepartment = async (employeeId, departmentId) => {
    try {
        //
       await http.post(`/employees/${employeeId}/assign-department`, { departmentId });
      setAssigningEmployee(null);
      fetchEmployees(); // Refresh the employees list
    } catch (error) {
      console.error('Error assigning department:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await http.get('/user');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await http.get('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    try {
      await http.post('/departments',{ name: newDepartment });
      setNewDepartment('');
      fetchDepartments(); // Refresh the departments list
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    try {
      await http.put(`/departments/${editingDepartment._id}`, { name: editingDepartment.name });
      setEditingDepartment(null);
      fetchDepartments();
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await http.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleFilterEmployees = async () => {
    try {
      let url = '/employees/filter?';
      
      if (location) {
        if (sortBy === 'userName') {
          url += `userName=${encodeURIComponent(location)}&`;
        } else {
          url += `location=${encodeURIComponent(location)}&`;
        }
      }
      
      url += `sortBy=${sortBy}&order=${order}`;
      
      const response = await http.get(url);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error filtering employees:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      <p className="mb-4">Your role: {user.role}</p>

      {user.role === 'manager' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Manage Departments</h2>
          <form onSubmit={handleCreateDepartment} className="flex mb-4">
            <input
              type="text"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              placeholder="Department name"
              className="flex-grow mr-2 p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Create
            </button>
          </form>
          <ul>
            {departments?.map((dept) => (
              <li key={dept._id} className="flex items-center mb-2">
                {editingDepartment && editingDepartment._id === dept._id ? (
                  <form onSubmit={handleUpdateDepartment} className="flex">
                    <input
                      type="text"
                      value={editingDepartment.name}
                      onChange={(e) => setEditingDepartment({...editingDepartment, name: e.target.value})}
                      className="flex-grow mr-2 p-2 border rounded"
                    />
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                    <button onClick={() => setEditingDepartment(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                  </form>
                ) : (
                  <>
                    <span className="flex-grow">{dept.name}</span>
                    <button onClick={() => setEditingDepartment(dept)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                    <button onClick={() => handleDeleteDepartment(dept._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

        <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Employees</h2>
        <div className="flex mb-4">
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={sortBy === 'userName' ? "Filter by name" : "Filter by location"}
                className="flex-grow mr-2 p-2 border rounded"
            />
           <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mr-2 p-2 border rounded"
                >
                <option value="userName">Sort by Name</option>
                <option value="location">Sort by Location</option>
          </select>
            <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="mr-2 p-2 border rounded"
            >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            </select>
            <button onClick={handleFilterEmployees} className="bg-blue-500 text-white px-4 py-2 rounded">
            Apply Filter
            </button>
        </div>
        <ul>
    {employees?.map((employee) => (
      <li key={employee._id} className="mb-2 flex items-center">
        <span className="flex-grow">
          {employee.userName} - {employee.email} - {employee.location}
          {employee.department && ` - Department: ${employee.department}`}
        </span>
        {user.role === 'manager' && (
          <button
            onClick={() => setAssigningEmployee(employee)}
            className="bg-purple-500 text-white px-4 py-2 rounded ml-2"
          >
            Assign Department
          </button>
        )}
      </li>
    ))}
  </ul>
        </div>

        {assigningEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-semibold mb-4">
              Assign Department to {assigningEmployee.userName}
            </h3>
            <select
              className="w-full p-2 mb-4 border rounded"
              onChange={(e) => handleAssignDepartment(assigningEmployee._id, e.target.value)}
            >
              <option value="">Select a department</option>
              {departments?.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setAssigningEmployee(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
  
    </div>
  );
};

export default Dashboard;