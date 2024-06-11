import { Router } from "express";
import { VerifiedUserAccount, CheckAccountVerifiedStatus, newVerificationLink } from "./verifiedController";
import { uploader } from "@/middleware/Uploader";
import { tokenVerify } from "@/helpers/Token";
import { NewVerificationLinkValidator, VerifiyAccountValidator } from "@/middleware/validator/verification/VerificationValidator";
import { handleErrorValidator } from "@/middleware/validator/handleErrorExpressValidator";

const router = Router()

router.put('/', tokenVerify, uploader, VerifiyAccountValidator, handleErrorValidator, VerifiedUserAccount) // Verified User Account and Set User Data
router.get('/status', tokenVerify, CheckAccountVerifiedStatus) // Check User Account Verified Status
router.post('/reverify', NewVerificationLinkValidator, handleErrorValidator, newVerificationLink) // Resend Email if jwt expired

export default router
