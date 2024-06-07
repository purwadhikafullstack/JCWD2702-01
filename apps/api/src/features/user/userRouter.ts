import { Router } from "express";
import { updateUserProfile, switchRole } from "./userController";
import { tokenVerify } from "@/helpers/Token";
import { uploader } from "@/middleware/Uploader";

const router = Router()
router.put("/profile", tokenVerify, uploader, updateUserProfile)
router.put("/role", tokenVerify, switchRole)

export default router
