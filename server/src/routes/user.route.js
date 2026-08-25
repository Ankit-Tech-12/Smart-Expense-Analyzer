import { Router } from "express";
import { loginUser, registration } from "../controller/user.controller.js";

const router=Router();

router.post("/register",registration)

router.get("/login",loginUser)

export default router;