import express from 'express'

import userAuth from '../middleware/authMiddleware.js';
import { createOrder, getOrder } from '../controller/OrderController.js';


const orderRouter = express.Router();
// create job
orderRouter.post('/create-order', userAuth, createOrder )
// get job
orderRouter.get('/get-order', userAuth, getOrder)


export default orderRouter;