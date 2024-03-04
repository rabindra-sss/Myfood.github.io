import express from 'express';
import  { testGetcontroller, testPostController } from '../controller/testControllers.js';
import userAuth from '../middleware/authMiddleware.js';
const routerTest= express.Router()

routerTest.get('/test-get',userAuth, testGetcontroller )

routerTest.post('/test-post', userAuth, testPostController )


export default routerTest;
