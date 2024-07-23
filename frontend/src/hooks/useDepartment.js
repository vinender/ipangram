
// hooks/useDepartments.js
import { useState, useCallback } from 'react';
import http from '../components/utils/http';
 
export const useDepartments = () => {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await http.get('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }, []);

  const createDepartment = useCallback(async (name) => {
    try {
      await http.post('/departments', { name });
      fetchDepartments();
    } catch (error) {
      console.error('Error creating department:', error);
    }
  }, [fetchDepartments]);

  const updateDepartment = useCallback(async (id, name) => {
    try {
      await http.put(`/departments/${id}`, { name });
      fetchDepartments();
    } catch (error) {
      console.error('Error updating department:', error);
    }
  }, [fetchDepartments]);

  const deleteDepartment = useCallback(async (id) => {
    try {
      await http.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  }, [fetchDepartments]);

  return { departments, fetchDepartments, createDepartment, updateDepartment, deleteDepartment };
};