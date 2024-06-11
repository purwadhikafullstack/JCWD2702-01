import { Router } from "express";
import { signout } from "./signoutController";
import { tokenVerify } from "@/helpers/Token";

const router = Router()

router.put('/', tokenVerify, signout)

export default router