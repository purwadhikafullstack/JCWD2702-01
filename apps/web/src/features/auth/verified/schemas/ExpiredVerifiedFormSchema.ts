import * as z from 'zod'

export const ExpiredVerifiedFormSchema = z.object({
    email: z.string().min(1, { message: "email is required" }).email({
        message: "invalid email address",
    }),
});