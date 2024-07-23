const User = require('../models/User');
const Department = require('../models/Department');

exports.getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const totalPages = Math.ceil(totalEmployees / pageSize);

    const employees = await User.find({ role: 'employee' })
      .select('-password')
      .skip(skip)
      .limit(pageSize);

    res.json({
      employees,
      currentPage: page,
      totalPages,
      totalEmployees
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
  };
  
  exports.getEmployeeDetails = async (req, res) => {
    try {
      const employee = await User.findById(req.params.id).select('-password');
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employee details', error: error.message });
    }
  };


  
  exports.filterEmployees = async (req, res) => {
    try {
      console.log('filter employee', req.query);
      const { location, userName, sortBy, order, page = 1, pageSize = 10 } = req.query;
      
      let query = { role: 'employee' };
      if (location) {
        query.location = new RegExp(location, 'i');
      }
      if (userName) {
        query.userName = new RegExp(userName, 'i');
      }
  
      const skip = (parseInt(page) - 1) * parseInt(pageSize);
  
      const totalEmployees = await User.countDocuments(query);
      const totalPages = Math.ceil(totalEmployees / parseInt(pageSize));
  
      const employees = await User.find(query)
        .select('-password')
        .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(parseInt(pageSize));
  
      res.json({
        employees,
        currentPage: parseInt(page),
        totalPages,
        totalEmployees
      });
    } catch (error) {
      res.status(500).json({ message: 'Error filtering employees', error: error.message });
    }
  };
  
 
exports.assignDepartment = async (req, res) => {
    try {
      const { employeeId } = req.params;
      const { departmentId } = req.body;
  
      // Find employee and department in parallel
      const [employee, department] = await Promise.all([
        User.findById(employeeId),
        Department.findById(departmentId)
      ]);

      console.log('department',department)
  
      // Check if employee exists
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Check if employee role is correct
      if (employee.role !== 'employee') {
        return res.status(400).json({ message: 'Can only assign departments to employees' });
      }
  
      // Check if department exists
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      // Update employee with new department
      employee.department = department.name;
      await employee.save();
  
      // Fetch the updated employee with populated department
      const updatedEmployee = await User.findById(employeeId).populate('department', 'name');
  
      res.status(200).json({
        message: 'Department assigned successfully',
        employee: {
          id: updatedEmployee._id,
          userName: updatedEmployee.userName,
          email: updatedEmployee.email,
          role: updatedEmployee.role,
          location: updatedEmployee.location,
          department: updatedEmployee.department ? updatedEmployee.department.name : null
        }
      });
  
    } catch (error) {
      console.error('Error assigning department:', error);
      res.status(500).json({ message: 'Error assigning department', error: error.message });
    }
  };

  
exports.getCurrentEmployee = async (req, res) => {
  try {
    const employeeId = req.user.id; // Assuming auth middleware attaches user id to req.user
    const employee = await Employee.findById(employeeId).select('-password');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Error fetching current employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};