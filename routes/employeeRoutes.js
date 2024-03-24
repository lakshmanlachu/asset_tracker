import Express from "express";
const employeeRoute = Express.Router();
import { getAllEmployees, getAddEmployeeForm, addEmployee, getEditEmployeeForm, deleteEmployee, editEmployee, toggleEmployeeStatus, updateEmployee } from '../controllers/employeeController.js';

import { validator } from "../middlewares/validator.js";
import { checkEmployeeDuplicateMail } from "../middlewares/commonfunc.js";

employeeRoute.get('/list', getAllEmployees);

employeeRoute.get('/add', getAddEmployeeForm);

employeeRoute.post('/addform', validator.addEmployee, checkEmployeeDuplicateMail, addEmployee);


employeeRoute.get('/view/:id', getEditEmployeeForm);

employeeRoute.get('/edit/:id', editEmployee);

employeeRoute.post('/editform/:id', updateEmployee);

employeeRoute.get('/toggle-status/:id', toggleEmployeeStatus);

employeeRoute.post('/delete/:id', deleteEmployee);


export default employeeRoute;