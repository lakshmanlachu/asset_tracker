import Express from "express";
const categoryRoute = Express.Router();
import { getAllCategory, getAddCategoryForm, addCategory, getEditCategoryForm, editCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { validator } from "../middlewares/validator.js";


categoryRoute.get('/list', getAllCategory);

categoryRoute.get('/add', getAddCategoryForm);

categoryRoute.post('/add', validator.addCategory, addCategory);


categoryRoute.get('/view/:id', getEditCategoryForm);

categoryRoute.get('/edit/:id', editCategory);

categoryRoute.post('/editform/:id', validator.updateCategory, updateCategory);

categoryRoute.post('/delete/:id', deleteCategory);



export default categoryRoute;