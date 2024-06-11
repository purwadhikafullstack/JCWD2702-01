import { Router } from "express";
import { newTenant, updateTenantProfile } from "./tenantController";
import { tokenVerify } from "@/helpers/Token";
import { uploader } from "@/middleware/Uploader";
import { NewTenantValidator, UpdateTenantProfileValidator } from "@/middleware/validator/tenant/TenantValidator";
import { handleErrorValidator } from "@/middleware/validator/handleErrorExpressValidator";

const router = Router()

router.post("/onboarding", tokenVerify, uploader, NewTenantValidator, handleErrorValidator, newTenant)
router.put("/profile", tokenVerify, uploader, UpdateTenantProfileValidator, handleErrorValidator, updateTenantProfile)

export default router