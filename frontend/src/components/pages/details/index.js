// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import http from '../../utils/http';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [newDepartment, setNewDepartment] = useState('');
//   const [employees, setEmployees] = useState([]);
//   const [assigningEmployee, setAssigningEmployee] = useState(null);
//   const [editingDepartment, setEditingDepartment] = useState(null);
//   const [location, setLocation] = useState('');
//   const [sortBy, setSortBy] = useState('name');
//   const [order, setOrder] = useState('asc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pageSize] = useState(4);
//   const [nameFilter, setNameFilter] = useState('');
//   const [locationFilter, setLocationFilter] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserData();
//     fetchDepartments();
//     setNameFilter('');
//     setLocationFilter('');
//     fetchEmployees(1);
//   }, []);

//   const fetchEmployees = async (page = 1) => {
//     try {
//       const response = await http.get(`/employees?page=${page}&pageSize=${pageSize}`);
//       setEmployees(response.data.employees);
//       setTotalPages(response.data.totalPages);
//       setCurrentPage(page);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const handleAssignDepartment = async (employeeId, departmentId) => {
//     try {
//         //
//        await http.post(`/employees/${employeeId}/assign-department`, { departmentId });
//       setAssigningEmployee(null);
//       fetchEmployees(); // Refresh the employees list
//     } catch (error) {
//       console.error('Error assigning department:', error);
//     }
//   };

//   const fetchUserData = async () => {
//     try {
//       const response = await http.get('/user');
//       setUser(response.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const response = await http.get('/departments');
//       setDepartments(response.data);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//     }
//   };

//   const handleCreateDepartment = async (e) => {
//     e.preventDefault();
//     try {
//       await http.post('/departments',{ name: newDepartment });
//       setNewDepartment('');
//       fetchDepartments(); // Refresh the departments list
//     } catch (error) {
//       console.error('Error creating department:', error);
//     }
//   };

//   const handleUpdateDepartment = async (e) => {
//     e.preventDefault();
//     try {
//       await http.put(`/departments/${editingDepartment._id}`, { name: editingDepartment.name });
//       setEditingDepartment(null);
//       fetchDepartments();
//     } catch (error) {
//       console.error('Error updating department:', error);
//     }
//   };

//   const handleDeleteDepartment = async (id) => {
//     try {
//       await http.delete(`/departments/${id}`);
//       fetchDepartments();
//     } catch (error) {
//       console.error('Error deleting department:', error);
//     }
//   };

//   const handleFilterEmployees = async (page = currentPage) => {
//     try {
//       let url = `/employees/filter?page=${page}&pageSize=${pageSize}&`;
      
//       if (nameFilter) {
//         url += `userName=${encodeURIComponent(nameFilter)}&`;
//       }
      
//       if (locationFilter) {
//         url += `location=${encodeURIComponent(locationFilter)}&`;
//       }
      
//       url += `sortBy=${sortBy}&order=${order}`;
      
//       const response = await http.get(url);
//       setEmployees(response.data.employees);
//       setTotalPages(response.data.totalPages);
//       setCurrentPage(page);
//     } catch (error) {
//       console.error('Error filtering employees:', error);
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Hi, {user.userName}</h1>
//       <p className="mb-4">Email: {user.email}</p>
//       <p className="mb-4">Address: {user.location}</p>
//         <p className="mb-4">Role: {user.role}</p>
//         {user.role === 'employee' && <p className="mb-4">Department: {user.department}</p>}
      
//       {user.role === 'manager' && (
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">Manage Departments</h2>
//           <form onSubmit={handleCreateDepartment} className="flex mb-4">
//             <input
//               type="text"
//               value={newDepartment}
//               onChange={(e) => setNewDepartment(e.target.value)}
//               placeholder="Department name"
//               className="flex-grow mr-2 p-2 border rounded"
//             />
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//               Create
//             </button>
//           </form>
//           <ul>
//             {departments?.map((dept) => (
//               <li key={dept._id} className="flex items-center mb-2">
//                 {editingDepartment && editingDepartment._id === dept._id ? (
//                   <form onSubmit={handleUpdateDepartment} className="flex">
//                     <input
//                       type="text"
//                       value={editingDepartment.name}
//                       onChange={(e) => setEditingDepartment({...editingDepartment, name: e.target.value})}
//                       className="flex-grow mr-2 p-2 border rounded"
//                     />
//                     <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
//                     <button onClick={() => setEditingDepartment(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//                   </form>
//                 ) : (
//                   <>
//                     <span className=" hover:bg-gray-100 p-3 rounded-lg text-lg text-gray-600 flex-grow">{dept.name}</span>
//                     <button onClick={() => navigate('/department-employees/'+dept._id)} className="bg-green-600 text-white px-4 py-2 rounded mr-2">View</button>
//                     <button onClick={() => setEditingDepartment(dept)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
//                     <button onClick={() => handleDeleteDepartment(dept._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//         { user?.role === 'manager' && 
//         <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Employees</h2>
//         <div className="flex mb-4">
//         <input
//           type="text"
//           value={nameFilter}
//           onChange={(e) => setNameFilter(e.target.value)}
//           placeholder="Filter by name"
//           className="flex-grow mr-2 p-2 border rounded"
//         />
//         <input
//           type="text"
//           value={locationFilter}
//           onChange={(e) => setLocationFilter(e.target.value)}
//           placeholder="Filter by location"
//           className="flex-grow mr-2 p-2 border rounded"
//         />
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="mr-2 p-2 border rounded"
//           >
//             <option value="name">Sort by Name</option>
//             <option value="location">Sort by Location</option>
//           </select>
//             <select
//             value={order}
//             onChange={(e) => setOrder(e.target.value)}
//             className="mr-2 p-2 border rounded"
//             >
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//             </select>
//             <button onClick={() => handleFilterEmployees(1)} className="bg-blue-500 text-white px-4 py-2 rounded">
//               Apply Filter
//             </button>
//             <button 
//                 onClick={() => {
//                   setNameFilter('');
//                   setLocationFilter('');
//                   handleFilterEmployees(1);
//                 }} 
//                 className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
//               >
//                 Clear Filters
//               </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {user?.role === 'manager' && employees?.map((employee) => (
//             <div key={employee._id} className="bg-white shadow-md rounded-lg p-4">
//               <h3 className="font-semibold text-lg">{employee.userName}</h3>
//               <p>{employee.email}</p>
//               <p>{employee.location}</p>
//               {employee.department && <p>Department: {employee.department}</p>}
//               <Link 
//                 to={`/employee/${employee._id}`} 
//                 className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 View Details
//               </Link>
//               {user?.role === 'manager' && (
//                 <button
//                   onClick={() => setAssigningEmployee(employee)}
//                   className="mt-2 ml-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//                 >
//                   Assign Department
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//     <div className="mt-4 flex justify-between items-center">
//         <button 
//           onClick={() => handleFilterEmployees(currentPage - 1)} 
//           disabled={currentPage === 1}
//           className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
//         >
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button 
//           onClick={() => handleFilterEmployees(currentPage + 1)} 
//           disabled={currentPage === totalPages}
//           className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
//         >
//           Next
//     </button>
//     </div>
//         </div>
//         }

//         {assigningEmployee && user?.role === 'manager' && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <h3 className="text-lg font-semibold mb-4">
//               Assign Department to {assigningEmployee.userName}
//             </h3>
//             <select
//               className="w-full p-2 mb-4 border rounded"
//               onChange={(e) => handleAssignDepartment(assigningEmployee._id, e.target.value)}
//             >
//               <option value="">Select a department</option>
//               {departments?.map((dept) => (
//                 <option key={dept._id} value={dept._id}>
//                   {dept.name}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={() => setAssigningEmployee(null)}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
  
//     </div>
//   );
// };

// export default Dashboard;