import { NextFunction, Response, Request } from "express";
import { IReqAccessToken } from "@/helpers/Token";
import { updateProfile, checkHasTenant, getTenantByUid } from "./userServices";
import { createToken } from "@/helpers/Token";

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
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
            const accesstoken = await createToken({ data: { uid: data.uid, display_name: data.display_name, rolesId: data.rolesId, image_url: data.image_url }, expiresIn: "3h" })
            res.status(200).send({
                error: false,
                message: "Profile Updated!",
                data: {
                    accesstoken,
                    data
                }
            })
        }

    } catch (error) {
        next(error)
    }
}

export const switchRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid, rolesId } = reqToken.payload.data

        const data = await checkHasTenant(uid, rolesId)

        if (data) {
            const getTenantProfileByUid = await getTenantByUid(uid)
            const accesstoken = await createToken({ data: { uid: data.uid, display_name: data.display_name, rolesId: data.rolesId, image_url: data.image_url }, expiresIn: "3h" })
            res.status(200).send({
                error: false,
                message: "Role change!",
                data: {
                    accesstoken,
                    user: data,
                    tenant: getTenantProfileByUid,
                    has_tenant: true
                }
            })
        } else {
            res.status(400).send({
                error: true,
                message: "No tenant profile",
                data: {
                    has_tenant: false
                }
            })
        }
    } catch (error) {
        next(error)
    }
}