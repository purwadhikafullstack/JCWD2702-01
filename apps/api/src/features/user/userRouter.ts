import { Router } from "express";
import { updateUserProfile, switchRole } from "./userController";
import { tokenVerify } from "@/helpers/Token";
import { uploader } from "@/middleware/Uploader";
import { UpdateUserProfileValidator } from "@/middleware/validator/user/userValidator";
import { handleErrorValidator } from "@/middleware/validator/handleErrorExpressValidator";

const router = Router()

router.put("/profile", tokenVerify, uploader, UpdateUserProfileValidator, handleErrorValidator, updateUserProfile)
router.put("/role", tokenVerify, switchRole)

export default router
