import Employee from '../models/employee.js'

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        if (employees) {
            return res.render('employee/index', { employees });
        } else {
            return res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const getEditEmployeeForm = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (employee) {
            res.render('employee/view', { employee });
        } else {
            return res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
export const editEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (employee) {
            res.render('employee/edit', { employee });
        } else {
            return res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const getAddEmployeeForm = async (req, res) => {
    try {
        res.render('employee/add')
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};


export const addEmployee = async (req, res) => {
    const { name, email, isActive, department } = req.body;
    try {
        const employee = await Employee.create({ name: name, email: email, is_active: isActive, department: department });
        if (employee) {
            return res.status(200).send({ status: true, message: "Add Employee Successfully" });
        } else {
            return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, isActive } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (employee) {
            employee.name = name;
            employee.email = email;
            employee.is_active = isActive;
            await employee.save();
            return res.status(200).send({ status: true, message: "Add Employee Successfully" });
        } else {
            res.status(404).send({ message: 'Employee not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};


export const toggleEmployeeStatus = async (req, res) => {
    const employeeId = req.params.id;
    try {
        const employee = await Employee.findByPk(employeeId);
        if (employee) {
            console.log(employee.is_active,'employee.is_active');
            employee.is_active = !employee.is_active;
            await employee.save();
            return res.status(200).send({ status: true, message: "Employee status toggled successfully", data: employee });
        } else {
            res.status(404).send({ message: 'Employee not found' });
        }
    } catch (error) {
        console.error('Error toggling employee status:', error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export const deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;
    try {
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        await employee.destroy();
        return res.status(200).send({ status: true, message: "Employee deleted successfully"});
    } catch (error) {
        console.error("Error deleting employee:", error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
