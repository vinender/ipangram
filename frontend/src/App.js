import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './components/pages/home/home';
import AuthPage from './components/pages/auth/login';
import LoginPage from './components/pages/auth/login';
 import EmployeeDetails from './components/employee-details';
import DepartmentEmployees from './components/department-employees';
// import Dashboard from './components/pages/details';
import Dashboard from './components/Dashboard/Dashboard';
  
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
          path="/details"
        />
        {/* <Route
          element={<Layout><Dashboard /></Layout>}
          path="/details"
        /> */}

        <Route 
          path="/employee/:id" 
          element={<Layout>
            <EmployeeDetails/>
          </Layout>}
         />

         <Route 
          path="/department-employees/:id" 
          element={<Layout>
            <DepartmentEmployees/>
          </Layout>}
         />
         
        
      </Routes>
    </Router>
    // </Provider>
  );
}

export default App;
