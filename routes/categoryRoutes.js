import Express from "express";
const categoryRoute = Express.Router();
import { getAllCategory, getAddCategoryForm, addCategory,getEditCategoryForm,editCategory,updateCategory,deleteCategory } from '../controllers/categoryController.js';


categoryRoute.get('/list', getAllCategory);

categoryRoute.get('/add', getAddCategoryForm);

categoryRoute.post('/add', addCategory);


categoryRoute.get('/view/:id', getEditCategoryForm);

categoryRoute.get('/edit/:id', editCategory);

categoryRoute.post('/editform/:id', updateCategory);

categoryRoute.post('/delete/:id', deleteCategory);



export default categoryRoute;