import { body } from "express-validator";

export const NewVerificationLinkValidator = [
    body('email').notEmpty().withMessage('Email is required').isString().isEmail().withMessage('Email Must Valid!'),
]

export const VerifiyAccountValidator = [
    body('data.display_name').notEmpty().withMessage('Username is required'),
    body('data.display_name').isLength({ min: 1, max: 15 }).withMessage('Username have 15 character max length'),
    body('data.password').notEmpty().withMessage('Password is required'),
    body('data.display_picture').isString()
]