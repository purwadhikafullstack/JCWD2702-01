import * as z from 'zod'

export const TenantSignupFormSchema = z.object({
    display_name: z
        .string(),
    image_url: z
        .string(),
    id_card_number: z
        .string(),
    phone: z
        .string()
});