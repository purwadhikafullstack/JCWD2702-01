import { Router } from "express";
import { VerifiedUserAccount, CheckAccountVerifiedStatus, newVerificationLink } from "./verifiedController";
import { uploader } from "@/middleware/Uploader";
import { tokenVerify } from "@/helpers/Token";

const router = Router()

router.put('/', tokenVerify, uploader, VerifiedUserAccount) // Verified User Account and Set User Data
router.get('/status', tokenVerify, CheckAccountVerifiedStatus) // Check User Account Verified Status
router.post('/reverify', newVerificationLink) // Resend Email if jwt expired

export default router
