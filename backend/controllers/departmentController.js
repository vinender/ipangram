const Department = require('../models/Department');
const User = require('../models/User');


exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = new Department({
      name,
      createdBy: req.user._id 
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
      const { employeeId } = req.params;
      const { departmentId } = req.body;
      console.log('Attempting to assign department:', { employeeId, departmentId });

      
  
      // Validate ObjectIds
      if (!mongoose.Types.ObjectId.isValid(employeeId) || !mongoose.Types.ObjectId.isValid(departmentId)) {
        return res.status(400).json({ message: 'Invalid employee or department ID format' });
      }

      
  
      // Find the employee
      const employee = await User.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      if (employee.role !== 'employee') {
        return res.status(400).json({ message: 'Can only assign departments to employees' });
      }
  
      // Find the department
      const department = await Department.findById(departmentId);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      // Assign department
      employee.department = {
        id: department._id,
        name: department.name
      };
      
      console.log('Department to be assigned:', {
        id: department._id,
        name: department.name
      });
      console.log('Employee before save:', employee);
      const updatedEmployee = await employee.save();
      console.log('Employee after save:', updatedEmployee)
  
      res.status(200).json({
        message: 'Department assigned successfully',
        employee: {
          id: updatedEmployee._id,
          userName: updatedEmployee.userName,
          email: updatedEmployee.email,
          role: updatedEmployee.role,
          location: updatedEmployee.location,
          department: updatedEmployee.department
        }
      });
    } catch (error) {
      console.error('Error in assignDepartment:', error);
      res.status(500).json({ message: 'Error assigning department', error: error.message });
    }
  };

  // In your department controller
exports.getDepartmentDetails = async (req, res) => {
  try {
    console.log('params',req.params)
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department details', error: error.message });
  }
};


exports.getDepartmentEmployees = async (req, res) => {
  try {
    console.log('getDepartmentEmployees', req.params);
    
    const department = await Department.findById(req.params.id);
    console.log('department name',department)
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Now, use the department name to find employees
    const employees = await User.find({ 
      'department': department.name, 
      role: 'employee' 
    }).select('-password');

    res.json(employees);
    // const response = res.json(employees);
    console.log('department employees',employees)
  } catch (error) {
    console.error('Error in getDepartmentEmployees:', error);
    res.status(500).json({ message: 'Error fetching department employees', error: error.message });
  }
};