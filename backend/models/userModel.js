import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name is required"]
    },

    lastName: {
        type: String,
        
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true,"email is already registered"],
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "Password length must be greater than 6"]
    },
    location: {
        type: String,
        default: "India"
    }
}, {timestamps: true})

// middleware
userSchema.pre('save', async function() {
    if(! this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparepassword = async function(inputpassword) {
    const ismatch = await bcrypt.compare(inputpassword, this.password);

    return ismatch;
};

userSchema.methods.createjwt= function() {
    return jwt.sign({userId: this._id},process.env.JWTSECRETKEY, {expiresIn: '1d'});
};



export default mongoose.model('User', userSchema);