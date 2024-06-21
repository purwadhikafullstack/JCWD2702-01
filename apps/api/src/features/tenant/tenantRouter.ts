import { Router } from "express";
import { newTenant, updateTenantProfile, newListing, myListing, deleteListing } from "./tenantController";
import { tokenVerify } from "@/helpers/Token";
import { listingUploader, uploader } from "@/middleware/Uploader";
import { NewTenantValidator, UpdateTenantProfileValidator, NewListingValidator } from "@/middleware/validator/tenant/TenantValidator";
import { handleErrorValidator } from "@/middleware/validator/handleErrorExpressValidator";
import { isTenantVerify } from "@/middleware/RoleVerify";

const router = Router()

router.post("/onboarding", tokenVerify, uploader, NewTenantValidator, handleErrorValidator, newTenant)
router.put("/profile", tokenVerify, uploader, UpdateTenantProfileValidator, handleErrorValidator, updateTenantProfile)
router.post('/listing', tokenVerify, isTenantVerify, listingUploader, NewListingValidator, handleErrorValidator, newListing)
router.get('/my-listings', tokenVerify, myListing)
router.delete('/listing/:listingId', deleteListing)

export default router