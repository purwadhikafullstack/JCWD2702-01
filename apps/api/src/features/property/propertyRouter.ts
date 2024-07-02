import { Router } from "express";
import { tokenVerify } from "@/helpers/Token";
import { addSeasonalPrice, addNonavailability, updateListingProperty } from "./propertyController";
import { listingUploader } from "@/middleware/Uploader";
import { isTenantVerify } from "@/middleware/RoleVerify";

const router = Router()
router.post('/set-seasonal-price', tokenVerify, isTenantVerify, addSeasonalPrice)
router.post('/set-nonavailability', tokenVerify, isTenantVerify, addNonavailability)
router.put('/listing', tokenVerify, isTenantVerify, listingUploader, updateListingProperty)

export default router

