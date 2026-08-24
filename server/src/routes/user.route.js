import { Router } from "express";
import { registration } from "../controller/user.controller.js";

const router=Router();

router.post("/register",registration)

export default router;