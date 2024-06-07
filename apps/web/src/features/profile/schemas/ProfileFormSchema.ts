import * as z from 'zod'

export const ProfileFormSchema = z.object({
    username: z.string()
});