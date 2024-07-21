// authActions.js

export const login = (user) => ({
    type: 'LOGIN',
    payload: user,
  });
  
  export const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Return the action object
    return {
      type: 'LOGOUT',
    };
  };
  
  

  // authActions.js

export const updateUser = (userData) => ({
  type: 'UPDATE_USER',
  payload: userData,
});

// Additional action for fetching user details if needed
export const fetchUser = () => ({
  type: 'FETCH_USER',
});
