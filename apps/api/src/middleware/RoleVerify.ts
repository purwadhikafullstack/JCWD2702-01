import { NextFunction, Request, Response } from "express";
import { findUserByUid } from "@/features/user/userServices";
import { IReqAccessToken } from "@/helpers/Token";

export const isTenantVerify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data

        const findUserByUidResult = await findUserByUid(uid)
        const authorized = ["2"]
        if (findUserByUidResult) {
            if (authorized.includes(findUserByUidResult?.rolesId.toString())) {
                next()
            } else {
                throw new Error('User Unauthorized!')
            }
        } else {
            throw new Error("ERROR")
        }
    } catch (error) {
        next(error)
    }
}