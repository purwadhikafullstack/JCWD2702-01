import { Router } from "express";
import { newUser } from "./signupController";
import { SignupValidator } from "@/middleware/validator/auth/signupValidator";
import { handleErrorValidator } from "@/middleware/validator/handleErrorExpressValidator";

const router = Router()
router.post('/user', SignupValidator, handleErrorValidator, newUser)

export default router


