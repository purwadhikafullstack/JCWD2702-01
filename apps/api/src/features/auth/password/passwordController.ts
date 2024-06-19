import { NextFunction, Response, Request } from "express";
import { findAccountByEmail, updateUserPassword } from "./passwordService";
import { transporterNodemailer } from "@/helpers/TransporterMailer";
import { IReqAccessToken, createToken } from "@/helpers/Token";
import fs from 'fs'
import Handlebars from 'handlebars';
import { HashPassword } from "@/helpers/Hashing";
import { hash } from "bcrypt";

export const sendResetPasswordLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        const findAccountByEmailResult = await findAccountByEmail(email)

        if (findAccountByEmailResult.is_verified === false) {
            const accesstoken = await createToken({ data: { uid: findAccountByEmailResult.uid, email: findAccountByEmailResult.email, isVerified: findAccountByEmailResult.is_verified }, expiresIn: "1h" })

            const verificationHTML = fs.readFileSync(process.env.NODEMAILER_TEMPLATE_PATH as string, 'utf-8')
            let verificationHTMLCompiled: any = await Handlebars.compile(verificationHTML)
            verificationHTMLCompiled = verificationHTMLCompiled({ username: email, link: `${process.env.WEB_URL}/verification/${accesstoken}` })

            transporterNodemailer.sendMail({
                from: 'Roomer',
                to: email,
                subject: 'Verify Your Account!',
                html: verificationHTMLCompiled
            })
            res.status(200).send({
                error: false,
                message: "Your account is not verified, We've sent you an email to verify your account!"
            })
        } else {
            const accesstoken = await createToken({ data: { uid: findAccountByEmailResult.uid, email: findAccountByEmailResult.email, isVerified: findAccountByEmailResult.is_verified }, expiresIn: "1h" })

            const resetPasswordHTML = fs.readFileSync(process.env.RESET_PASSWORD_TEMPLATE_PATH as string, 'utf-8')
            let ResetPasswordHTMLCompiled: any = await Handlebars.compile(resetPasswordHTML)
            ResetPasswordHTMLCompiled = ResetPasswordHTMLCompiled({ username: email, link: `${process.env.WEB_URL}/reset-password/${accesstoken}` })

            transporterNodemailer.sendMail({
                from: 'Roomer',
                to: email,
                subject: 'Reset Your Password!',
                html: ResetPasswordHTMLCompiled
            })
            res.status(200).send({
                error: false,
                message: "We've sent you an email to reset your password!"
            })
        }
    } catch (error) {
        next(error)
    }
}

export const newPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const { password } = req.body

        const hashedPassword = await HashPassword({ password: password })
        await updateUserPassword({ uid, password: hashedPassword })

        res.status(200).send({
            error: false,
            message: "Password Updated!"
        })
    } catch (error) {
        next(error)
    }
}