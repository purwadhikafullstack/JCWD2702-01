import * as z from 'zod'

export const ProfileFormSchema = z.object({
    username: z.string().max(15, { message: "username have 15 max length" }),
});