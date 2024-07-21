// authReducer.js

  const token = localStorage.getItem('token');
  const initialState = {
    isLoggedIn: !!token, // Check if token exists
    token: token || null,
    // Other user details if needed
  };


  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  