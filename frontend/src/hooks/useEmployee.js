// hooks/useEmployees.js
import { useState, useCallback } from 'react';
import http from '../components/utils/http';
 
export const useEmployees = (pageSize) => {
  const [employees, setEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEmployees = useCallback(async (page = 1, filters = {}) => {
    try {
      let url = `/employees/filter?page=${page}&pageSize=${pageSize}&`;
      
      if (filters.nameFilter) {
        url += `userName=${encodeURIComponent(filters.nameFilter)}&`;
      }
      
      if (filters.locationFilter) {
        url += `location=${encodeURIComponent(filters.locationFilter)}&`;
      }
      
      url += `sortBy=${filters.sortBy}&order=${filters.order}`;
      
      const response = await http.get(url);
      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }, [pageSize]);

  return { employees, totalPages, currentPage, fetchEmployees };
};
 