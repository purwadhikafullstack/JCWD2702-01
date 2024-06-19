import * as z from 'zod'

export const listingFacilitiesDetailsFormSchema = z.object({
    facilities: z.array(z.number()),
    price_per_night: z.string().min(1, { message: "Price is required!" }),
    capacity: z.string().min(1, { message: "Capacity is required!" }),
    restrictions: z.string(),
    bedding_details: z.string().min(1, { message: "Bed details is required!" }),
})

export const listingUploadImagesFormSchema = z.object({
    listingImages: z.string().min(1, { message: "Images is required!" })
})

export const listingGeneralDetailsFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required!" }),
    location: z.string().min(1, { message: "Location is required!" }),
    addressDetails: z.string().min(1, { message: "Address is required!" }),
    phone: z.string().min(1, { message: "Phone is required!" }),
    description: z.string().min(1, { message: "Description is required!" })
})

export const listingRoomtypeFormSchema = z.object({
    room_name: z.string().min(1, { message: "Room name is required!" }),
    price_per_night: z.string().min(1, { message: "Room price is required!" }),
    capacity: z.string().min(1, { message: "Capacity is required!" }),
    restrictions: z.string(),
    bedding_details: z.string().min(1, { message: "Bed details is required!" }),
    facilities: z.array(z.number()),
    breakfast_option: z.string().min(1, { message: "Breakfast option is required!" }),
    room_images: z.string().min(1, { message: "Images is required!" }),
    breakfast_charge: z.string(),
    stock: z.string().min(1, { message: "Stock is required!" }),
})

export const setSeasonalPriceFormSchema = z.object({
    price: z.string().min(1, { message: "Price is required!" }),
    // start_date: z.string().min(1, { message: "Start Date is required!" }),
    // end_date: z.string().min(1, { message: "End Date is required!" }),
})