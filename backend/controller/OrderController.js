import orderModel from "../models/OrderModel.js";
import mongoose from "mongoose";

/// CREATE ORDER
export const createOrder = async (req, res, next)=> {

    // validation 
    
    // add userId
    req.body= req.body.map((item)=>({...item, orderedby: req.user.userId })) // append ('orderedby': 'userId') for every items in the list

    const order = await orderModel.create(req.body);

    res.status(200).send({
        success: true,
        message: "order placed successfully",
        order
    })
}

export const getOrder = async (req,res)=> {

    const userId = req.user.userId;
    if(!userId){
        return next("no userid")
    }
    
    const allorders = await global.orders_coll.find({orderedby: new mongoose.Types.ObjectId(userId)}).toArray();
    res.status(200).send({
        allorders
    })
}