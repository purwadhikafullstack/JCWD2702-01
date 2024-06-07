import { Router } from "express";
import { signin, persistSignin } from "./signinController";
import { tokenVerify } from "@/helpers/Token";

const router = Router()

router.post('/', signin) // Login User
router.post('/persist', tokenVerify, persistSignin) // Keep Login

export default router