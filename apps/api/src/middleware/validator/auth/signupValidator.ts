import { body } from "express-validator";

export const SignupValidator = [
    body('email').notEmpty().withMessage('Email is required').isString().isEmail().withMessage('Email Must Valid!'),
]