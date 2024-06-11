import { NextFunction, Response, Request } from "express";
import { IReqAccessToken } from "@/helpers/Token";
import { resetRole } from "./signoutService";

export const signout = async (req: Request, res: Response, next: NextFunction,) => {
    try {
        const reqToken = req as IReqAccessToken;
        const { uid } = reqToken.payload.data

        await resetRole(uid)

        res.status(201).send({
            error: false,
            message: "Success"
        })

    } catch (error) {
        next(error);
    }
}