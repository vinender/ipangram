import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const http = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // You can add other common headers here
  },
});

// const navigate = useNavigate();

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    // Add token to request header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  (response) => {
    // Do something with successful response
    console.log('Response received:', response);
    // Save token to local storage if present in response
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response;
  },
  (error) => {
    // Do something with response error
    console.error('Response error:', error);
    // Redirect user to '/' if they are not logged in
    if (error.response && error.response.status === 401) {
      // navigate('/login'); // Redirect to home page
    }
    return Promise.reject(error); // Properly return the error object
  }
);

export default http;
