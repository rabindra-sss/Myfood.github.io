import userModel from "../models/userModel.js";

export const registerController = async (req,res, next) => {
    try{

        const {name, email, password} = req.body;

        // if(!name) {
        //    return res.status(400).send({success: false, message: "name can't be empty"})
        // } 

        // validate
       // const userName = req.body.name;
        if(!name) {
            next("name can't be empty")
        }
        if(!email) {
            next("email can't be empty")
        }
        if(!password) {
            next("password can't be empty")
        }
        
        const existinguser = await userModel.findOne({email});

        if(existinguser) {
            return next("user already registered. Please Log in")
        }

        const user = await userModel.create({name, email, password});

        const token = user.createjwt();

        res.status(201).send({
            success: true,
            message: "user registered successfully",
            user:{
                name: user.name,
                email: user.email,
                location: user.location,
            },
            token
        });


    } catch(error){
        
        res.status(400).send({
            message: "error in register controller",
            success: false,
            error
        })
    }
}

export const loginController = async (req, res, next) => {
    const {email, password} = req.body;
    //validation
    if(!email || !password) {
        next('provide all fields');
    }
    const existinguser = await userModel.findOne({email});
    if(!existinguser) {
        return next('invalid username or password');
    }
    
    const ismatch= await existinguser.comparepassword(password);
    
    if(!ismatch) {
        return next('invalid username or password');
    }

    const token = existinguser.createjwt();
    res.status(201).json({
        success: true,
        message: "login successfully",
        user:{
            name: existinguser.name,
            email: existinguser.email,
            location: existinguser.location
        },
        token
    })

}