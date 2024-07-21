import { useSelector } from 'react-redux';

 
const useCurrentUser = () => {
  const currentUser = useSelector(state => state.auth.user);
  console.log('Current user from hook:', currentUser); // Log currentUser value
  return currentUser;
};

export default useCurrentUser;
