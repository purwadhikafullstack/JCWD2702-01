import * as z from 'zod';


export const SignupFormSchema = z.object({
    email: z.string().min(1, { message: "email is required" }).email({
        message: "invalid email address",
    }),
});