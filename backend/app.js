const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ipangram');

// Routes
const userRoutes = require('./routes/userRoutes');

const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authenticate = require('./middleware');
 
app.use(express.json()); // Parse JSON bodies
 // Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/', authRoutes);
app.use('/', uploadRoutes);

// Root endpoint handler
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
