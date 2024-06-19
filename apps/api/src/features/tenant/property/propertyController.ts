import { IReqAccessToken } from "@/helpers/Token";
import { NextFunction, Response, Request } from "express";
import { setSeasonalPrice, checkListingOwner } from "./propertyService";

export const addSeasonalPrice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const { price, room_types_id, start_date, end_date } = req.body

        const checkListingOwnerResult = await checkListingOwner({ uid, room_types_id })

        if (checkListingOwnerResult) {
            setSeasonalPrice({ price, room_types_id, start_date, end_date })
        } else {
            throw new Error('User unauthorized')
        }

        res.status(200).send({
            error: false,
            message: "Set seasonal price success",
            data: "Ini data"
        })
    } catch (error) {
        next(error)
    }
}
