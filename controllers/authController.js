import User from '../models/user.js';
import bcrypt from "bcrypt";
import CONFIG from "../config/config.js";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let findUser = await User.findOne({ where: { email: email } });
        if (findUser) {
            let pass_match = await bcrypt.compare(password, findUser.password);
            if (pass_match) {
                let jwt_obj = {
                    name: findUser.name,
                    email: email,
                    user_id: findUser._id
                };
                jwt_obj.token = jwt.sign({ data: jwt_obj }, CONFIG.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 360) });
                return res.status(200).send({ status: true, message: "Login successfully", response: jwt_obj });
            } else {
                return res.status(404).send({ status: false, message: "Incorrect Password! Please check and try again" });
            };
        } else {
            return res.status(404).send({ status: false, message: "User not found! Please check the email and try again" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            return res.status(500).send({ status: false, message: "Password and confirm password not matched" });
        }
        let insert_user = {};
        insert_user.name = name;
        insert_user.email = email;
        let bcrypt_pass = await bcrypt.genSaltSync(10);
        insert_user.password = await bcrypt.hash(password, bcrypt_pass);
        var save_user = await User.create(insert_user);
        if (save_user.dataValues) {
            let jwt_obj = {
                name: save_user.dataValues.name,
                email: save_user.dataValues.email,
                user_id: save_user.dataValues.id
            };
            jwt_obj.token = jwt.sign({ data: jwt_obj }, CONFIG.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 360) });
            return res.status(200).send({ status: true, message: "User Register Successfully", response: jwt_obj });
        } else {
            return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong! Please try again" });
    }
};

const logoutUser = async (req, res) => {
    try {

    } catch (error) {

    }
};

export { loginUser, registerUser, logoutUser };