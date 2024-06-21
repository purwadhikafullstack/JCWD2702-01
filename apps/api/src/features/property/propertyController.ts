import { IReqAccessToken } from "@/helpers/Token";
import { NextFunction, Response, Request } from "express";
import { setSeasonalPrice, checkListingOwner } from "./propertyService";

export const addSeasonalPrice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const { price, room_types_id, start_date, end_date } = req.body

        const seasonalPrice = await setSeasonalPrice({ price, room_types_id, start_date, end_date, uid })

        res.status(200).send({
            error: false,
            message: "Set seasonal price success",
            data: { seasonalPrice }
        })
    } catch (error) {
        next(error)
    }
}
