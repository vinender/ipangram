// routes/departmentRoutes.js
const express = require('express');
const { 
    createDepartment, 
    getAllDepartments,
    updateDepartment ,
    deleteDepartment,
    assignDepartment,
    getDepartmentEmployees,
    getDepartmentDetails } = require('../controllers/departmentController');
const authenticate = require('../middleware');
const isManager = require('../middleware/isManager'); // You'll need to create this

const router = express.Router();

router.post('/', authenticate, isManager, createDepartment);
router.get('/', authenticate, getAllDepartments);
// routes/departmentRoutes.js

router.put('/:id', authenticate, isManager, updateDepartment);
router.delete('/:id', authenticate, isManager, deleteDepartment);
router.post('/employees/:employeeId/assign-department', authenticate, isManager, assignDepartment);
router.get('/:id', authenticate, getDepartmentDetails);
router.get('/:id/employees', authenticate, getDepartmentEmployees);

module.exports = router;