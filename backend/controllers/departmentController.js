// controllers/departmentController.js
const Department = require('../models/Department'); // Adjust the path as needed
const User = require('../models/User');


exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = new Department({
      name,
      createdBy: req.user._id // Assuming you have user info in req.user from auth middleware
    });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error: error.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

// controllers/departmentController.js

exports.updateDepartment = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const department = await Department.findByIdAndUpdate(id, { name }, { new: true });
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.json(department);
    } catch (error) {
      res.status(500).json({ message: 'Error updating department', error: error.message });
    }
  };
  
  exports.deleteDepartment = async (req, res) => {
    try {
      const { id } = req.params;
      const department = await Department.findByIdAndDelete(id);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.json({ message: 'Department deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting department', error: error.message });
    }
  };



  exports.assignDepartment = async (req, res) => {
    try {
        // return 'hello';
        console.log('request',req)
      const { employeeId } = req.params;
      const { departmentId } = req.body;
  
      console.log('Attempting to assign department:', { employeeId, departmentId });
  
      // Validate ObjectIds
      if (!mongoose.Types.ObjectId.isValid(employeeId) || !mongoose.Types.ObjectId.isValid(departmentId)) {
        return res.status(400).json({ message: 'Invalid employee or department ID format' });
      }
  
      // Find the employee
         const employee = await User.findById(employeeId);
      console.log('Found employee:', employee);
  
      if (!employee) {
        console.log('Employee not found for ID:', employeeId);
        return res.status(404).json({ message: 'Employee not foundrfgr' });
      }
  
      if (employee.role !== 'employee') {
        return res.status(400).json({ message: 'Can only assign departments to employees' });
      }
  
      // Find the department
      const department = await Department.findById(departmentId);
      console.log('Found department:', department);
  
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      // Assign department
      employee.department = departmentId;
      await employee.save();
      console.log('Department assigned successfully');
  
      res.status(200).json({ 
        message: 'Department assigned successfully', 
        employee: {
          id: employee._id,
          userName: employee.userName,
          email: employee.email,
          role: employee.role,
          location: employee.location,
          department: employee.department
        }
      });
  
    } catch (error) {
        // return '';
      console.error('Error in assignDepartment:', error);
      res.status(500).json({ message: 'Error assigning department', error: error.message });
    }
  };