import { Router } from "express";
import { newTenant, updateTenantProfile } from "./tenantController";
import { tokenVerify } from "@/helpers/Token";
import { uploader } from "@/middleware/Uploader";

const router = Router()

router.post("/onboarding", tokenVerify, uploader, newTenant)
router.put("/profile", tokenVerify, uploader, updateTenantProfile)

export default router