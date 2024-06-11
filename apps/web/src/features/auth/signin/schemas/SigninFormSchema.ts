import * as z from 'zod'

export const SigninFormSchema = z.object({
    email: z.string().min(1, { message: "email is required" }).email({
        message: "invalid email address",
    }),
    password: z
        .string()
        .min(1, { message: "password is required" })
        .min(5, { message: "must be 5 or more character length" }),
});