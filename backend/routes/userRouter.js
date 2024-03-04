import express from 'express'
import userAuth from '../middleware/authMiddleware.js';
import { userController } from '../controller/userController.js';

const userRouter = express.Router();

// update user || put

userRouter.put('/update-user',userAuth,userController);

export default userRouter;