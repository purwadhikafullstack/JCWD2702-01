import { Router } from "express";
import { newTenant, updateTenantProfile, newListing, myListing, deleteListing } from "./tenantController";
import { tokenVerify } from "@/helpers/Token";
import { listingUploader, uploader } from "@/middleware/Uploader";
import { NewTenantValidator, UpdateTenantProfileValidator, NewListingValidator } from "@/middleware/validator/tenant/TenantValidator";
import { addSeasonalPrice } from "./property/propertyController";
import { handleErrorValidator } from "@/middleware/validator/handleErrorExpressValidator";
import { isTenantVerify } from "@/middleware/RoleVerify";

const router = Router()

router.post("/onboarding", tokenVerify, uploader, NewTenantValidator, handleErrorValidator, newTenant)
router.put("/profile", tokenVerify, uploader, UpdateTenantProfileValidator, handleErrorValidator, updateTenantProfile)
router.post('/listing', tokenVerify, isTenantVerify, listingUploader, NewListingValidator, handleErrorValidator, newListing)
router.get('/my-listings', tokenVerify, myListing)
router.delete('/listing/:listingId', deleteListing)
router.post('/set-seasonal-price', tokenVerify, addSeasonalPrice)

// localhost:8000/tenant/properties/listing 
export default router