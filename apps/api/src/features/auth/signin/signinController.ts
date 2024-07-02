import { NextFunction, Response, Request } from "express";
import { findUserByEmail } from "./signinServices";
import { comparePassword } from "@/helpers/Hashing";
import { IReqAccessToken, createToken } from "@/helpers/Token";
import { getTenantByUid } from "@/features/user/userServices";

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const findLoginUserByEmailResult = await findUserByEmail({ email })

        if (findLoginUserByEmailResult.password) {
            if (password) {
                const comparePasswordResult = await comparePassword({ passwordFromClient: password, passwordFromDb: findLoginUserByEmailResult.password });
                if (!comparePasswordResult) throw new Error('Password is incorrect!');
            } else {
                throw new Error('Password is required for this account!');
            }
        } else if (password && !findLoginUserByEmailResult.password && findLoginUserByEmailResult.providersId === 1) {
            throw new Error("This account is not verified!")
        } else if (password) {
            throw new Error('This account uses social login, please use the appropriate login method.');
        }

        const accesstoken = await createToken({ data: { uid: findLoginUserByEmailResult.uid, display_name: findLoginUserByEmailResult.display_name, rolesId: findLoginUserByEmailResult.rolesId, image_url: findLoginUserByEmailResult.image_url }, expiresIn: "3h" })

        res.status(201).send({
            error: false,
            message: "Login Success",
            data: {
                accesstoken,
                uid: findLoginUserByEmailResult.uid,
                display_name: findLoginUserByEmailResult.display_name,
                rolesId: findLoginUserByEmailResult.rolesId,
                image_url: findLoginUserByEmailResult.image_url,
                tenants: findLoginUserByEmailResult.tenants?.display_name
            }
        })

    } catch (error) {
        next(error)
    }
}

export const persistSignin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken;
        const { uid, rolesId, display_name, image_url } = reqToken.payload.data;
        const tenant = await getTenantByUid(uid)

        res.status(200).send({
            error: false,
            message: 'jwt token validated',
            user: { uid, rolesId, display_name, image_url },
            tenant: tenant
        });
    } catch (error) {
        next(error);
    }
};