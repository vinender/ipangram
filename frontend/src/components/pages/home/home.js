import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Avatar } from '@mui/material'; // Import Material-UI components
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
            <div className="flex font-bold text-xl justify-center mb-4">
              My Profile
            </div>
            <div className="space-y-2 mx-auto text-left">
              <p className="text-gray-700">Name: {userDetails.userName}</p>
              <p className="text-gray-700">Email: {userDetails.email}</p>
              <p className="text-gray-700">Role: {userDetails.role}</p>
              {/* <p className="text-gray-700">Zip Code: {userDetails.zipCode}</p> */}
              <p className="text-gray-700">Address: {userDetails?.location}</p>
            </div>
            {/* <div className="mt-6 space-y-3">
              <Link
                to="/profile"
                className="block w-full py-2 px-4 bg-blue-500 text-white text-center rounded hover:bg-blue-600 transition duration-200"
              >
                Edit Profile
              </Link>
              <Link
                to="/near-by-users"
                className="block w-full py-2 px-4 bg-purple-500 text-white text-center rounded hover:bg-purple-600 transition duration-200"
              >
                Nearby Users
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}