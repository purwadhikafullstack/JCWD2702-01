import { Router } from "express";
import { tokenVerify } from "@/helpers/Token";
import { addSeasonalPrice } from "./propertyController";

const router = Router()
router.post('/set-seasonal-price', tokenVerify, addSeasonalPrice)

export default router

