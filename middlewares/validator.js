import { check, validationResult ,param} from "express-validator"
let validator = {};


validator.user_register = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    check('confirm_password', 'Confirm Password is required').notEmpty(),
    (req, res, next) => {
        let errors = validationResult(req).errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return res.status(400).send({ status: false, message: errors[0].msg })
        };
        next();
    }
];

validator.user_login = [
    check('email', 'Email is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    (req, res, next) => {
        let errors = validationResult(req).errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return res.status(400).send({ status: false, message: errors[0].msg })
        };
        next();
    }
];
validator.addassets = [
    check('serial_number', 'Serial number is required').notEmpty(),
    check('name', 'Name is required').notEmpty(),
    check('category_id', 'Category ID is required').notEmpty(),
    check('purchase_date', 'Purchase date is required').notEmpty(),
    check('status', 'Status is required').notEmpty(),
    check('branch', 'Branch is required').notEmpty(),

    (req, res, next) => {
        let errors = validationResult(req).errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return res.status(400).send({ status: false, message: errors[0].msg })
        };
        next();
    }
];
validator.editassets = [
    param('id', 'ID parameter is required').notEmpty(),
    check('serial_number', 'Serial number is required').notEmpty(),
    check('name', 'Name is required').notEmpty(),
    check('category_id', 'Category ID is required').notEmpty(),
    check('purchase_date', 'Purchase date is required').notEmpty(),
    check('status', 'Status is required').notEmpty(),
    check('branch', 'Branch is required').notEmpty(),

    (req, res, next) => {
        let errors = validationResult(req).errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return res.status(400).send({ status: false, message: errors[0].msg })
        };
        next();
    }
];
validator.addEmployee = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('department', 'Development is required').notEmpty(),

    (req, res, next) => {
        let errors = validationResult(req).errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return res.status(400).send({ status: false, message: errors[0].msg })
        };
        next();
    }
];
validator.editEmployee = [
    param('id', 'ID parameter is required').notEmpty(),
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('department', 'Development is required').notEmpty(),

    (req, res, next) => {
        let errors = validationResult(req).errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return res.status(400).send({ status: false, message: errors[0].msg })
        };
        next();
    }
];
validator.addCategory = [
    check('name', 'Category name is required').notEmpty(),
    check('description', 'Category description is required').notEmpty(),
    (req, res, next) => {
        let errors = validationResult(req).errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return res.status(400).send({ status: false, message: errors[0].msg })
        };
        next();
    }
];

validator.updateCategory = [
    param('id', 'ID parameter is required').notEmpty(),
    check('name', 'Category name is required').notEmpty(),
    check('description', 'Category description is required').notEmpty(),
    (req, res, next) => {
        let errors = validationResult(req).errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return res.status(400).send({ status: false, message: errors[0].msg })
        };
        next();
    }
];
export { validator }