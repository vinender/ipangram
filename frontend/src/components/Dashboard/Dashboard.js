// components/Dashboard/Dashboard.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
 import EmployeeList from './EmployeeList';
import DepartmentList from './DepartmentList';
import FilterForm from './FilterForm';
import Pagination from './Pagination';
import AssignDepartmentModal from '../Modal/AssignDepartmentModal';
import http from '../utils/http';
import { useEmployees } from '../../hooks/useEmployee';
import { useDepartments } from '../../hooks/useDepartment';
import EditDepartmentModal from '../Modal/EditDepartmentModal';

  const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [newDepartment, setNewDepartment] = useState('');
  const [assigningEmployee, setAssigningEmployee] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [filters, setFilters] = useState({
    nameFilter: '',
    locationFilter: '',
    sortBy: 'name',
    order: 'asc'
  });

  const PAGE_SIZE = 4;
  const { employees, totalPages, currentPage, fetchEmployees } = useEmployees(PAGE_SIZE);
  const { departments, fetchDepartments, createDepartment, updateDepartment, deleteDepartment } = useDepartments();

  useEffect(() => {
    fetchUserData();
    fetchDepartments();
    fetchEmployees(1, filters);
  }, [fetchDepartments, fetchEmployees]);

  const fetchUserData = async () => {
    try {
      const response = await http.get('/user');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleCreateDepartment = useCallback(async (e) => {
    e.preventDefault();
    await createDepartment(newDepartment);
    setNewDepartment('');
  }, [createDepartment, newDepartment]);

  const handleUpdateDepartment = useCallback(async (id, name) => {
    try {
      await updateDepartment(id, name);
      setEditingDepartment(null);
    } catch (error) {
      console.error('Error updating department:', error);
    }
  }, [updateDepartment]);

  
  const handleAssignDepartment = useCallback(async (employeeId, departmentId) => {
    try {
      await http.post(`/employees/${employeeId}/assign-department`, { departmentId });
      setAssigningEmployee(null);
      fetchEmployees(currentPage, filters);
    } catch (error) {
      console.error('Error assigning department:', error);
    }
  }, [fetchEmployees, currentPage, filters]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  }, []);

  const handleApplyFilter = useCallback(() => {
    fetchEmployees(1, filters);
  }, [fetchEmployees, filters]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      nameFilter: '',
      locationFilter: '',
      sortBy: 'name',
      order: 'asc'
    });
    fetchEmployees(1, {
      nameFilter: '',
      locationFilter: '',
      sortBy: 'name',
      order: 'asc'
    });
  }, [fetchEmployees]);

  const memoizedEmployeeList = useMemo(() => (
    <EmployeeList 
      employees={employees} 
      onAssignDepartment={setAssigningEmployee} 
    />
  ), [employees]);

  const memoizedDepartmentList = useMemo(() => (
    <DepartmentList 
      departments={departments} 
      onEdit={setEditingDepartment} 
      onDelete={deleteDepartment} 
    />
  ), [departments, deleteDepartment]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hi, {user.userName}</h1>
      <p className="mb-4">Email: {user.email}</p>
      <p className="mb-4">Address: {user.location}</p>
      <p className="mb-4">Role: {user.role}</p>
      {user.role === 'employee' && <p className="mb-4">Department: {user.department}</p>}
      
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
          {memoizedDepartmentList}
        </div>
      )}

      {assigningEmployee && (
        <AssignDepartmentModal
          employee={assigningEmployee}
          departments={departments}
          onAssign={handleAssignDepartment}
          onClose={() => setAssigningEmployee(null)}
        />
      )}

      {editingDepartment && (
        <EditDepartmentModal
          department={editingDepartment}
          onUpdate={handleUpdateDepartment}
          onClose={() => setEditingDepartment(null)}
        />
      )}

      {user.role === 'manager' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Employees</h2>
          <FilterForm 
            filters={filters} 
            onFilterChange={handleFilterChange}
            onApplyFilter={handleApplyFilter}
            onClearFilters={handleClearFilters}
          />
          {memoizedEmployeeList}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={(page) => fetchEmployees(page, filters)}
          />
        </div>
      )}

       </div>
  )}


  export default Dashboard;