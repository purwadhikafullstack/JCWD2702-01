import * as z from 'zod'

export const VerifiedFormSchema = z.object({
    password: z
        .string()
        .min(1, { message: "password is required" })
        .min(5, { message: "must be 5 or more character length" }),
    username: z
        .string()
        .min(1, { message: "username is required" }),
    profilePict: z.string(),
});