import Express from "express";
const assetsRoute = Express.Router();
import {
    getAllAssets, addAsset, getAddAssetsForm, getcategories, getEditAssetsForm,
    editAssets, stockAssets, updateAssets, deleteAssets, issueAssets, scrapAssets, historyAssets, returnAssets
} from "../controllers/assetsController.js";
import { validator } from "../middlewares/validator.js";


assetsRoute.get('/list', getAllAssets);

assetsRoute.get('/add', getAddAssetsForm);

assetsRoute.post('/addform',validator.addassets, addAsset);

assetsRoute.get('/categories', getcategories);


assetsRoute.get('/view/:id', getEditAssetsForm);

assetsRoute.get('/edit/:id', editAssets);

assetsRoute.post('/editform/:id', updateAssets);

assetsRoute.post('/delete/:id', deleteAssets);

assetsRoute.get('/stock', stockAssets);

assetsRoute.get('/issue', issueAssets);

assetsRoute.get('/scrap', scrapAssets);

assetsRoute.get('/return', returnAssets);

assetsRoute.get('/history/:id', historyAssets);



export default assetsRoute;