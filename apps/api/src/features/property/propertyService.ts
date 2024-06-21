import { prisma } from "@/connection";
import { ISetSeasonalPrice } from "./type";
import { areIntervalsOverlapping } from "date-fns";

export const setSeasonalPrice = async ({ uid, price, room_types_id, start_date, end_date }: ISetSeasonalPrice) => {

    const checkListingOwnerResult = await checkListingOwner({ uid, room_types_id })

    if (!checkListingOwnerResult) {
        throw new Error('User unauthorized')
    }

    const getSeasonalPrice = await prisma.seasonal_prices.findMany({
        where: {
            room_typesId: room_types_id
        }
    })

    const inputDate = { start: new Date(start_date), end: new Date(end_date) }
    getSeasonalPrice.forEach((item) => {
        const checkOverlap = areIntervalsOverlapping(inputDate, { start: new Date(item.start_date), end: new Date(item.end_date) })
        if (checkOverlap) {
            throw new Error("Seasonal Price for that interval already exists")
        }
    })

    return await prisma.seasonal_prices.create({
        data: {
            room_typesId: room_types_id,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            price: price
        }
    })
}

export const checkListingOwner = async ({ uid, room_types_id }: { uid: string, room_types_id: number }) => {
    const listingOwner = await prisma.room_types.findUnique({
        where: {
            id: room_types_id
        },
        include: {
            listing: {
                include: {
                    tenant: true
                }
            }
        }
    })

    if (listingOwner?.listing.tenant.usersId === uid) {
        return true
    } else {
        return false
    }
}
