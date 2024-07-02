import { prisma } from "@/connection";
import { ISetSeasonalPrice, ISetNonavailability } from "./type";
import { areIntervalsOverlapping } from "date-fns";

export const setSeasonalPrice = async ({ price, room_types_id, start_date, end_date }: ISetSeasonalPrice) => {
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

export const setNonavailability = async ({ room_types_id, start_date, end_date }: ISetNonavailability) => {
    const getNonavailability = await prisma.nonavailability.findMany({
        where: {
            room_typesId: room_types_id
        }
    })

    const inputDate = { start: new Date(start_date), end: new Date(end_date) }
    getNonavailability.forEach((item) => {
        const checkOverlap = areIntervalsOverlapping(inputDate, { start: new Date(item.start_date), end: new Date(item.end_date) })
        if (checkOverlap) {
            throw new Error("Nonavailability for that interval already exists")
        }
    })

    return await prisma.nonavailability.create({
        data: {
            room_typesId: room_types_id,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
        }
    })
}

export const listingUpdate = async (uid: string, listingData: any, roomTypeData: any, listingImages: any, roomtypeImages: any) => {
    return prisma.$transaction(async (prisma) => {
        const listingToUpdate = await prisma.listings.findUnique({
            where: {
                id: listingData.listing_id
            }
        })
        const updatedListing = await prisma.listings.update({
            where: {
                id: listingToUpdate?.id
            },
            data: {
                title: listingData.title || listingToUpdate?.title,
                description: listingData.description || listingToUpdate?.description
            }
        })
        if (listingData.title) {
            await prisma.listings.update({
                where: {
                    id: listingToUpdate?.id
                },
                data: {
                    slug: `${updatedListing.title} ${updatedListing.id}`.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
                }
            })
        }
        if (listingImages) {
            const updatedListingImages = await prisma.listing_images.findMany({
                where: {
                    listingsId: listingToUpdate?.id
                }
            });

            listingImages.forEach((item: any, index: number) => {
                if (updatedListingImages[index]) {
                    updatedListingImages[index].image_url = `${process.env.SERVER_URL as string}/${item.path}`;
                }
            });

            for (const image of updatedListingImages) {
                await prisma.listing_images.update({
                    where: {
                        id: image.id,
                    },
                    data: {
                        image_url: image.image_url,
                    }
                });
            }
        }

        if (listingData.listing_facilities) {
            const listing_facilities = listingData.listing_facilities.map((item: any) => ({
                listingsId: listingToUpdate?.id,
                facilitiesId: item,
            }));

            const currentFacilities = await prisma.listing_facilities.findMany({
                where: {
                    listingsId: listingToUpdate?.id,
                },
                select: {
                    facilitiesId: true,
                },
            });

            const currentFacilityIds = currentFacilities.map((facility: any) => facility.facilitiesId);
            const newFacilityIds = listing_facilities.map((facility: any) => facility.facilitiesId);

            const facilitiesToRemove = currentFacilityIds.filter(id => !newFacilityIds.includes(id));

            if (facilitiesToRemove.length > 0) {
                await prisma.listing_facilities.deleteMany({
                    where: {
                        listingsId: listingToUpdate?.id,
                        facilitiesId: { in: facilitiesToRemove },
                    },
                });
            }

            for (const facility of listing_facilities) {
                await prisma.listing_facilities.upsert({
                    where: {
                        listingsId_facilitiesId: {
                            listingsId: facility.listingsId,
                            facilitiesId: facility.facilitiesId,
                        },
                    },
                    update: {},
                    create: facility,
                });
            }
        }

        if (roomTypeData.room_types) {
            const roomTypeToUpdate = await prisma.room_types.findUnique({
                where: {
                    id: roomTypeData.room_types
                }
            })
            const updatedRoomTypes = await prisma.room_types.update({
                where: {
                    id: roomTypeToUpdate?.id
                },
                data: {
                    name: roomTypeData.room_types_name || roomTypeToUpdate?.name,
                    price: roomTypeData.price || roomTypeToUpdate?.price,
                    bed_details: roomTypeData.bedding_details || roomTypeToUpdate?.bed_details
                }
            })

            if (roomtypeImages) {
                const updatedRoomtypeImages = await prisma.room_images.findMany({
                    where: {
                        room_typesId: updatedRoomTypes.id
                    }
                });

                roomtypeImages.forEach((item: any, index: number) => {
                    if (updatedRoomtypeImages[index]) {
                        updatedRoomtypeImages[index].image_url = `${process.env.SERVER_URL as string}/${item.path}`;
                    }
                });

                for (const image of updatedRoomtypeImages) {
                    await prisma.room_images.update({
                        where: {
                            id: image.id,
                        },
                        data: {
                            image_url: image.image_url,
                        }
                    });
                }
            }

            if (roomTypeData.room_facilities) {
                const room_facilities = roomTypeData.room_facilities.map((item: any) => ({
                    room_typesId: roomTypeToUpdate?.id,
                    facilitiesId: item,
                }));

                const currentFacilities = await prisma.room_facilities.findMany({
                    where: {
                        room_typesId: roomTypeToUpdate?.id,
                    },
                    select: {
                        facilitiesId: true,
                    },
                });

                const currentFacilityIds = currentFacilities.map((facility: any) => facility.facilitiesId);
                const newFacilityIds = room_facilities.map((facility: any) => facility.facilitiesId);

                const facilitiesToRemove = currentFacilityIds.filter(id => !newFacilityIds.includes(id));

                if (facilitiesToRemove.length > 0) {
                    await prisma.room_facilities.deleteMany({
                        where: {
                            room_typesId: roomTypeToUpdate?.id,
                            facilitiesId: { in: facilitiesToRemove },
                        },
                    });
                }

                for (const facility of room_facilities) {
                    await prisma.room_facilities.upsert({
                        where: {
                            room_typesId_facilitiesId: {
                                room_typesId: facility.room_typesId,
                                facilitiesId: facility.facilitiesId

                            }
                        },
                        update: {},
                        create: facility,
                    });
                }
            }
        }
    })
}
