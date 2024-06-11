import { body } from "express-validator";

export const SigninValidator = [
    body('email').notEmpty().withMessage('Email is requred'),
    body('email').isString().isEmail().withMessage('Email Must Valid!'),

]