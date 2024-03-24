import express from 'express';
import { validator } from "../middlewares/validator.js";
import { checkUserDuplicateMail } from "../middlewares/commonfunc.js";
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';

const Authrouter = express.Router();

// Define route handlers
Authrouter.post('/login', validator.user_login, loginUser);
Authrouter.post('/register', validator.user_register, checkUserDuplicateMail, registerUser);

// Export the Authrouter instance
export default Authrouter;