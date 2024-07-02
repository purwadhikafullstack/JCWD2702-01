import { IReqAccessToken } from "@/helpers/Token";
import { NextFunction, Response, Request } from "express";
import { setSeasonalPrice, checkListingOwner, setNonavailability, listingUpdate } from "./propertyService";

export const addSeasonalPrice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const { price, room_types_id, start_date, end_date } = req.body

        const checkListingOwnerResult = await checkListingOwner({ uid, room_types_id })

        if (!checkListingOwnerResult) {
            throw new Error('User unauthorized')
        }

        const seasonalPrice = await setSeasonalPrice({ price, room_types_id, start_date, end_date })

        res.status(200).send({
            error: false,
            message: "Set seasonal price success",
            data: { seasonalPrice }
        })
    } catch (error) {
        next(error)
    }
}

export const addNonavailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const { room_types_id, start_date, end_date } = req.body

        const checkListingOwnerResult = await checkListingOwner({ uid, room_types_id })

        if (!checkListingOwnerResult) {
            throw new Error('User unauthorized')
        }

        const nonavailability = await setNonavailability({ room_types_id, start_date, end_date })

        res.status(200).send({
            error: false,
            message: "Set nonavailability success",
            data: { nonavailability }
        })
    } catch (error) {
        next(error)
    }
}

export const updateListingProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken
        const { uid } = reqToken.payload.data
        const listingData = JSON.parse(req.body.listingData)
        const roomTypeData = JSON.parse(req.body.roomTypeData)

        let updatedListing: any
        if (req.files) {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const listingUploadedFiles = Array.isArray(req.files) ? req.files : req.files['listingImages'];
            const roomtypeUploadedFiles = files['roomtypeImages'] ? (Array.isArray(files['roomtypeImages']) ? files['roomtypeImages'] : [files['roomtypeImages']]) : [];
            updatedListing = await listingUpdate(uid, listingData, roomTypeData, listingUploadedFiles, roomtypeUploadedFiles)
        }
        res.status(200).send({
            error: false,
            message: "Success!",
            updatedListing
        })


    } catch (error) {
        next(error)
    }
}
