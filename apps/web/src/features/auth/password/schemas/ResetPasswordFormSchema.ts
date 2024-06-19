import * as z from 'zod';

export const ResetPasswordFormSchema = z.object({
    password: z.string().min(1, { message: "password is required" })
});

export const SendEmailResetPasswordFormSchema = z.object({
    email: z.string().min(1, { message: "email is required" }).email({
        message: "invalid email address",
    }),
});