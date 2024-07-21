import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../utils/useAuth';
import { useSelector } from 'react-redux';
import useCurrentUserDetails from '../../utils/currentUserDetails';
import http from '../../utils/http';
import { useNavigate } from 'react-router-dom';
import GooglePlacesAutocomplete from '../../GooglePlacesAutocomplete';
import Uploader from '../../uploader/uploader';

const Profile = () => {
  const { userDetails, loading, error } = useCurrentUserDetails();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    zipCode: '',
    profilePic: null,
    address: '',
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (userDetails?._id) {
        try {
          const response = await http.get(`${process.env.REACT_APP_API_URL}/users/${userDetails._id}`);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            mobile: response.data.mobile,
            zipCode: response.data.zipCode,
            address: response?.data?.address?.formattedAddress || '',
            profilePic: response.data.profilePic,
            password: '',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUrlChange = (imageUrl) => {
    setFormData({ ...formData, profilePic: imageUrl });
  };

  const handleAddressSelect = (address) => {
    setFormData({
      ...formData,
      address: {
        formattedAddress: address.formattedAddress,
        latitude: address.latitude,
        longitude: address.longitude,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails?._id) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('mobile', formData.mobile);
        formDataToSend.append('zipCode', formData.zipCode);
        formDataToSend.append('password', formData.password);

        if (formData.profilePic instanceof File) {
          formDataToSend.append('profilePic', formData.profilePic);
        } else {
          formDataToSend.append('profilePic', formData.profilePic);
        }

        const response = await http.put(`${process.env.REACT_APP_API_URL}/profile/${userDetails?._id}`, formDataToSend);
        console.log('Profile updated successfully:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Profile update failed:', error.response.data);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Uploader onImageUrlChange={handleImageUrlChange} profilePic={formData.profilePic} />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="mobile"
              name="mobile"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            {/* <GooglePlacesAutocomplete onAddressSelect={handleAddressSelect} /> */}
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
