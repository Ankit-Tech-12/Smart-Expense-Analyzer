import mongoose from "mongoose"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

//cookie
const cookieOptions = {
  httpOnly: true,
  secure: process.env.SECURE,
  sameSite: process.env.SAMESITE,
};

// generating token
const generateToken = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "user not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefressToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken }
}

//safe User format
const safeUser = (user) => {
    return{
        _id:user._id,
        email:user.email,
        fullName:user.fullName
    }
}

//registration
const registration = asyncHandler(async (req, res) => {
    let { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new ApiError(400, "Fill required detail !!");
    }

    fullName = fullName.trim().toLowerCase();
    email = email.trim().toLowerCase();
    password = password.trim();

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new ApiError(400, "User already exit with this mail");
    }

    const user = await User.create({
        fullName,
        email,
        password,
    })

    const createdUser = safeUser(user);

    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User registered"));
});

//login
const loginUser = asyncHandler(async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Fill required detail!!");
    }

    email = email.toLowerCase().trim();
    password = password.trim();

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "user was not found");
    }
    const isValid = await user.isPasswordValid(password);
    if (!isValid) {
        throw new ApiError(401,"Invalid Password");
    }

    const {accessToken,refreshToken}=await generateToken(user._id);

    const data = safeUser(user);
    return res
    .status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json(new ApiResponse(200,data,"User loggin"))
});

//logout
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        }
    );

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(
                200,
                null,
                "User logged out successfully"
            )
        );
});

//get current user
const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Current user fetched successfully"
            )
        );
});

export {
    registration,
    loginUser,
    logoutUser,
    getCurrentUser,
}