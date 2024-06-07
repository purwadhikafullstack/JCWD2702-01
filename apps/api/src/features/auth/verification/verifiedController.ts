import { NextFunction, Response, Request } from "express";
import { transporterNodemailer } from "@/helpers/TransporterMailer";
import { IReqAccessToken, createToken } from "@/helpers/Token";
import fs from 'fs'
import Handlebars from 'handlebars';
import { VerifiedAccount, searchUserByEmail } from "./verifiedServices";

export const VerifiedUserAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const userData = JSON.parse(req.body.data)

        let data
        if (req.files) {
            const uploadedFiles = Array.isArray(req.files) ? req.files : req.files['images'];
            data = await VerifiedAccount(uid, userData, uploadedFiles)
        }

        res.status(200).send({
            error: false,
            message: "Success",
            data
        })
    } catch (error) {
        next(error)
    }
}

export const CheckAccountVerifiedStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { email } = reqToken.payload.data

        const searchUserByEmailResult = await searchUserByEmail({ email })

        res.status(201).send({
            error: false,
            message: "Success",
            data: searchUserByEmailResult?.is_verified
        })

    } catch (error) {
        next(error)
    }
}

export const newVerificationLink = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email } = req.body

        const searchUserResult = await searchUserByEmail({ email })

        let accesstoken
        if (searchUserResult) {
            accesstoken = await createToken({ data: { uid: searchUserResult.uid, email: searchUserResult.email, isVerified: searchUserResult.is_verified }, expiresIn: "1h" })
        }

        const verificationHTML = fs.readFileSync('src/public/template/verification.html', 'utf-8')
        let verificationHTMLCompiled: any = await Handlebars.compile(verificationHTML)
        verificationHTMLCompiled = verificationHTMLCompiled({ username: email, link: `http://localhost:3000/verification/${accesstoken}` })

        transporterNodemailer.sendMail({
            from: 'Roomer',
            to: email,
            subject: 'Verify Your Account!',
            html: verificationHTMLCompiled
        })

        res.status(201).send({
            error: false,
        })
    } catch (error) {
        next(error)
    }
}
