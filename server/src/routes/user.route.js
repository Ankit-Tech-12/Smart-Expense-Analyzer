import { Router } from "express";
import { 
    loginUser, 
    registration,
    getCurrentUser,
logoutUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();

router.post("/register",registration)

router.post("/login",loginUser)

router.post("/logout", verifyJWT,logoutUser)

router.get("/me", verifyJWT, getCurrentUser);

export default router;