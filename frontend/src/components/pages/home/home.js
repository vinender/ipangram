import React from 'react';
import { Link } from 'react-router-dom';
import useCurrentUserDetails from '../../utils/currentUserDetails';
 

export default function Home() {
  const { userDetails, loading, error } = useCurrentUserDetails();

  if (loading) {
    return <p className="text-center">Loading user details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading user details: {error.message}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex space-x-3 font-semibold text-xl justify-center mb-4">
              Welcome,  <span className='font-bold text-xl'>
              {userDetails?.userName}
              </span> 
            </div>
            <div className="space-y-2 mx-auto text-left">
              {/* <p className="text-gray-700">Name: {userDetails.userName}</p> */}
              <Link 
                to={`/details`} 
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </Link>
              {/* <p className="text-gray-700">Email: {userDetails.email}</p>
              <p className="text-gray-700">Role: {userDetails.role}</p>
               <p className="text-gray-700">Address: {userDetails?.location}</p> */}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}