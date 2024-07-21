import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/reducers/authActions';
 
const useInitializeAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize authentication state from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Dispatch login action with token payload
      dispatch(login({ token }));
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts
};

export default useInitializeAuth;
