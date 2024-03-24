import User from '../models/user.js';
import Employee from '../models/employee.js';


const checkUserDuplicateMail = async (req, res, next) => {
    const { email } = req.body;
    try {
        let checkmail = await User.findAll({ where: { email: email } });
        if (checkmail.length > 0) {
            return res.status(400).send({ status: false, message: "Email is already registered" });
        };
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};
const checkEmployeeDuplicateMail = async (req, res, next) => {
    const { email } = req.body;
    try {
        let checkmail = await Employee.findAll({ where: { email: email } });
        if (checkmail.length > 0) {
            return res.status(400).send({ status: false, message: "Email is already registered" });
        };
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

export { checkUserDuplicateMail, checkEmployeeDuplicateMail };