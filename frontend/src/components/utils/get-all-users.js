import { useState, useEffect } from 'react';
import http from './http';
 
// Custom hook to fetch all users
const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await http.get(`${process.env.REACT_APP_API_URL}/users`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  return { users, loading, error };
};

export default useAllUsers;
