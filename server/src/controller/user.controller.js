import mongoose from "mongoose"
import { asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registration = asyncHandler (async (req ,res ) => {
    let {fullName , email, password} = req.body;
    if(!fullName || !email || !password){
       throw new ApiError(400,"Fill required detail !!");
    }
    fullName=fullName.trim().toLowerCase();
    email=email.trim().toLowerCase();
    password=password.trim();
    const isUserExist=await User.findOne({email})
    if(isUserExist){
        throw new ApiError(400,"User already exit with this mail");
    }
    const user=await User.create({
        fullName,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered"));
});

export {
    registration
}