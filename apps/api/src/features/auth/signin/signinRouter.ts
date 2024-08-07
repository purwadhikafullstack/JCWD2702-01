import { Router } from "express";
import { signin, persistSignin } from "./signinController";
import { tokenVerify } from "@/helpers/Token";
import { SigninValidator } from "@/middleware/validator/auth/signinValidator";
import { handleErrorValidator } from "@/middleware/validator/handleErrorExpressValidator";

const router = Router()

router.post('/', SigninValidator, handleErrorValidator, signin)
router.post('/persist', tokenVerify, persistSignin)

export default router