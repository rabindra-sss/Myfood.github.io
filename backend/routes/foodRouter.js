import express from 'express'
import { getfood } from '../controller/foodController.js';

const foodRouter = express.Router();

foodRouter.get('/get-food', getfood);

export default foodRouter;