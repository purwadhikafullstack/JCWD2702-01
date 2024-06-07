import { NextFunction, Response, Request } from "express";
import { createUser } from "./signupService";
import { transporterNodemailer } from "@/helpers/TransporterMailer";
import { IReqAccessToken, createToken } from "@/helpers/Token";
import fs from 'fs'
import Handlebars from 'handlebars';

export const newUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uid, email, display_name, is_verified, image_url } = req.body

        const createdUser = await createUser({ uid, email, display_name, is_verified, image_url })

        if (createdUser) {
            const accesstoken = await createToken({ data: { uid: createdUser.uid, email: createdUser.email, isVerified: createdUser.is_verified }, expiresIn: "1h" })

            const verificationHTML = fs.readFileSync('src/public/template/verification.html', 'utf-8')
            let verificationHTMLCompiled: any = await Handlebars.compile(verificationHTML)
            verificationHTMLCompiled = verificationHTMLCompiled({ username: email, link: `http://localhost:3000/verification/${accesstoken}` })

            transporterNodemailer.sendMail({
                from: 'Roomer',
                to: email,
                subject: 'Verify Your Account!',
                html: verificationHTMLCompiled
            })

        }

        res.status(201).send({
            error: false,
            message: "Account Created!",
            provider: createdUser?.providersId
        })

    } catch (error) {
        next(error)
    }
}


