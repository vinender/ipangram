// userController.js
 const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userName, email, mobile, zipCode, address, password, profilePic } = req.body;
    const userId = req.params.id; // Assuming you have middleware to extract user id from token

    // Find the user by id
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's name, email, mobile, zipCode, and address
    user.name = userName;
    user.email = email;
    user.mobile = mobile;
    user.zipCode = zipCode;
    user.address = address;
    user.profilePic = profilePic;

    // If password is provided, hash it and update user's password
    if (password) {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Update user's password with the hashed password
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    // Return updated user
    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getCurrentUser = async (req, res) => {
  try {
    console.log(req.headers['authorization'])
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header is missing or invalid');
    }
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const jwtSecret = process.env.JWT_SECRET || 'mySecretKey';
    const decoded = jwt.verify(token, jwtSecret);

    // Find user by ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }
    console.log(user)
    return res.json(user); // Return user object as JSON
  } catch (error) {
    console.error('Error fetching current user:', error);
    return res.status(500).json({ error: error.message }); // Return error message
  }
};


const getAllUsers = async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Get single user details by user ID
  const getUserById = async (req, res) => {
    try {
      console.log('params',req.params)
      const userId = req.params.id; // Access user ID from request params
      if (!userId) {
        throw new Error('User ID is undefined');
      }
  
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  

module.exports = {
  updateUserProfile,
  getAllUsers,
  getUserById,getCurrentUser,
};
