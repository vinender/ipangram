import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
   import Home from './components/pages/home/home';
import AuthPage from './components/pages/auth/login';
import LoginPage from './components/pages/auth/login';
import Dashboard from './components/pages/dashboard';
  
function App() {

  // useInitializeAuth();
  return (
    // <Provider store={store}>
    <Router>
      <Routes>
      <Route
          element={<Layout><Home /></Layout>}
          path="/"
        />
          
        <Route
          element={<Layout><LoginPage /></Layout>}
          path="/login"
        />
        <Route
          element={<Layout><Dashboard /></Layout>}
          path="/dashboard"
        />
         
        
      </Routes>
    </Router>
    // </Provider>
  );
}

export default App;
