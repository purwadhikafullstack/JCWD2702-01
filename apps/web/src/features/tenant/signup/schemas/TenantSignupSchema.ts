import * as z from 'zod'

export const TenantSignupFormSchema = z.object({
    display_name: z
        .string().min(1, { message: "username is required" }).max(15, { message: "username have 15 max length" }),
    image_url: z
        .string(),
    phone: z
        .string().min(1, { message: "phone number is required" }),
    id_card_number: z
        .string().min(1, { message: "id card number is required" })
});

export const TenantBankDetailsFormSchema = z.object({
    card_holder_name: z.string(),
    card_number: z.string(),
    exp_date: z.string(),
    cvv: z.string()
})