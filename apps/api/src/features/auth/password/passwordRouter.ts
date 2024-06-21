import { Router } from "express";
import { newPassword, sendResetPasswordLink } from "./passwordController";
import { tokenVerify } from "@/helpers/Token";

const router = Router()
router.post('/reset-password-link', sendResetPasswordLink)
router.put('/', tokenVerify, newPassword)

export default router
