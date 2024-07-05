import * as z from 'zod'

export const ProfileFormSchema = z.object({
    username: z.string().max(15, { message: "username have 15 max length" }),
<<<<<<< HEAD
=======
    email: z.string().refine(
        (val) => val === '' || z.string().email().safeParse(val).success,
        { message: "Email is invalid" }
    ),
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
    image_url: z.string()
});