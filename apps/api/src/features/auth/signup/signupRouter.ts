import { Router } from "express";
import { newUser } from "./signupController";

const router = Router()
router.post('/user', newUser) // Create User

export default router


