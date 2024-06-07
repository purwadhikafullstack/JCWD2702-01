import { IReqAccessToken } from "@/helpers/Token";
import { NextFunction, Response, Request } from "express";
import { registerTenant, getUserByUid, updateProfile } from "./tenantService";
import { createToken } from "@/helpers/Token";

export const newTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const tenantData = JSON.parse(req.body.data)

        let data
        if (req.files) {
            const uploadedFiles = Array.isArray(req.files) ? req.files : req.files['images'];
            data = await registerTenant(uid, tenantData, uploadedFiles)
        }

        const getUserByUidResult = await getUserByUid(uid)
        if (getUserByUidResult) {
            const accesstoken = await createToken({ data: { uid: getUserByUidResult.uid, display_name: getUserByUidResult.display_name, rolesId: getUserByUidResult.rolesId, image_url: getUserByUidResult.image_url }, expiresIn: "3h" })
            res.status(200).send({
                error: false,
                message: "Tenant Created!",
                data: {
                    accesstoken,
                    tenant: data,
                    user: getUserByUidResult
                }
            })
        }

    } catch (error) {
        next(error)
    }
}

export const updateTenantProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const profileData = JSON.parse(req.body.data)

        let data
        if (req.files) {
            const uploadedFiles = Array.isArray(req.files) ? req.files : req.files['images'];
            data = await updateProfile(uid, profileData, uploadedFiles)
        }
        if (data) {
            const getUserByUidResult = await getUserByUid(uid)
            const accesstoken = await createToken({ data: { uid: getUserByUidResult?.uid, display_name: getUserByUidResult?.display_name, rolesId: getUserByUidResult?.rolesId, image_url: getUserByUidResult?.image_url }, expiresIn: "3h" })
            res.status(200).send({
                error: false,
                message: "Profile Updated!",
                data: {
                    accesstoken,
                    tenant: data
                }
            })
        }

    } catch (error) {
        next(error)
    }
}