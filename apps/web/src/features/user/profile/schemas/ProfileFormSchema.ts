import * as z from 'zod'

export const ProfileFormSchema = z.object({
    username: z.string().max(15, { message: "username have 15 max length" }),
    email: z.string().refine(
        (val) => val === '' || z.string().email().safeParse(val).success,
        { message: "Email is invalid" }
    ),
    image_url: z.string()
});