import { NextFunction, Response, Request } from "express";
import { IReqAccessToken } from "@/helpers/Token";
import { updateProfile, checkHasTenant, getTenantByUid, findUserByUid, unverifiedUserStatus } from "./userServices";
import { createToken } from "@/helpers/Token";
import { transporterNodemailer } from "@/helpers/TransporterMailer";
import fs from 'fs'
import Handlebars from "handlebars";

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const profileData = JSON.parse(req.body.data)

        let updatedData
        if (req.files) {
            const uploadedFiles = Array.isArray(req.files) ? req.files : req.files['images'];
            updatedData = await updateProfile(uid, profileData, uploadedFiles)
            if (profileData.email) {
                const accesstoken = await createToken({ data: { uid: updatedData.uid, email: profileData.email, display_name: updatedData.display_name, rolesId: updatedData.rolesId, image_url: updatedData.image_url }, expiresIn: "1h" })
                await unverifiedUserStatus(uid)

                const verificationHTML = fs.readFileSync(process.env.NODEMAILER_TEMPLATE_PATH as string, 'utf-8')
                let verificationHTMLCompiled: any = await Handlebars.compile(verificationHTML)
                verificationHTMLCompiled = verificationHTMLCompiled({ username: profileData.email, link: `${process.env.WEB_URL}/verification/${accesstoken}` })

                transporterNodemailer.sendMail({
                    from: 'Roomer',
                    to: profileData.email,
                    subject: 'Verify Your New Email!',
                    html: verificationHTMLCompiled
                })
                return res.status(200).send({
                    error: false,
                    message: "We've sent you an email to verify your new email",
                    data: { accesstoken }

                })
            }
        }
        if (updatedData) {
            const accesstoken = await createToken({ data: { uid: updatedData.uid, display_name: updatedData.display_name, rolesId: updatedData.rolesId, image_url: updatedData.image_url }, expiresIn: "3h" })
            return res.status(200).send({
                error: false,
                message: "Profile Updated!",
                data: {
                    accesstoken,
                    updatedData
                }
            })
        }

        res.status(400).send({
            error: true,
            message: "No files were uploaded or no data was updated",
        });

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

export const getUserprofile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data

        const getUserProfileResult = await findUserByUid(uid)

        res.status(200).send({
            error: false,
            message: "Success",
            getUserProfileResult
        })
    } catch (error) {
        next(error)
    }
}