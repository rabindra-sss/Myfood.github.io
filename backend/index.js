// import
// type common js
//const express= require("express");
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from 'cors';
import morgan from 'morgan';
import "express-async-errors";
import helmet from "helmet";
import xssFilters from "xss-filters";
import ExpressMongoSanitize from "express-mongo-sanitize";

// import from files
import connectDB from "./config/db.js";
import routerTest from "./routes/testRouter.js";

import router_auth from "./routes/authRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRouter.js";
import foodRouter from "./routes/foodRouter.js";
import orderRouter from "./routes/orderRouter.js";
// .env configuration
dotenv.config()

//mongoDB connection
connectDB();

// rest object
const app = express();

app.use(helmet());

// app.use(xss);
app.get('/', function(req, res){
    var firstname = req.query.firstname; //an untrusted input collected from user
    res.send('<h1> Hello, ' + xssFilters.inHTMLData(firstname) + '!</h1>');
  });

//middleware
app.use(ExpressMongoSanitize())
app.use(express.json());

app.use(cors())
app.use(morgan('dev'));

//port
const PORT= process.env.PORT || 8080

// routes
app.use('/api/v1/test', routerTest)


app.use('/api/v1/auth', router_auth)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/food', foodRouter)
app.use('/api/v1/order',orderRouter)
// validation middleware
app.use(errorMiddleware)

//listen 
app.listen(PORT)