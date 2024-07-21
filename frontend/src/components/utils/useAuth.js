import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect user to login page if not logged in
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn;
};

export default useAuth;
