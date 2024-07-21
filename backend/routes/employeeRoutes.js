// routes/employeeRoutes.js

const express = require('express');
const { getAllEmployees, getEmployeeDetails, filterEmployees, assignDepartment } = require('../controllers/employeeController');
const authenticate = require('../middleware');
const isManager = require('../middleware/isManager');

const router = express.Router();

router.get('/', authenticate, getAllEmployees);
router.get('/filter', authenticate, filterEmployees);
router.get('/:id', authenticate, getEmployeeDetails);
router.post('/:employeeId/assign-department', authenticate, isManager, assignDepartment);


module.exports = router;
