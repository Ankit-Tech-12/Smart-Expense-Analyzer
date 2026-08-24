import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"

const userSchema = new Schema ({
    fullName:{
        String:true,
        trim:true,
        required:true,
        lowercase:true,
    },
    email:{
       String:true,
        trim:true,
        required:true,
        lowercase:true,
        unique:true, 
    },
    password:{
        String:true,
        required:true,
        trim:true,
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save", async function () {
    if(!this.isModified(this.password)) return;
    this.password = await bcrypt.hash(this.password,12);
});

userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.method.generateAccessToken = function () {
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullName:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefressToken = function () {
    return jwt.sign(
        {_id:this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
} 

export const User = mongoose.model("User",userSchema);