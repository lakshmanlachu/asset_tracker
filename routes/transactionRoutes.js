import Express from "express";
const transactionRoute = Express.Router();
import { addIssue, returnIssue, scrapIssue } from '../controllers/transactionController.js';


transactionRoute.post('/issue', addIssue);
transactionRoute.post('/return', returnIssue);
transactionRoute.post('/scrap', scrapIssue);


export default transactionRoute;