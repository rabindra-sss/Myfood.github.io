import userModel from "../models/userModel.js";

export const userController = async (req,res,next)=> {
    const {name, email, location} = req.body

    // validation
    if(!name|| !email || !location) {
        next("please provide all fields");

    };

    const user = await userModel.findOne({ _id: req.user.userId});

    user.name = name;
    user.email= email;
    user.location = location;

    await user.save();

    const token = user.createjwt();

    res.status(200).json({
        success: true,
        message: "user updated successfully",
        user: {
            name: user.name,
            email: user.email,
            location: user.location
        },
        token
    })

};