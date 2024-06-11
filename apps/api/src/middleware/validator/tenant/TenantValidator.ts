import { body } from "express-validator";

export const NewTenantValidator = [
    body('data.display_name,').notEmpty().withMessage('display name is required'),
    body('data.image_url').isString(),
    body('data.id_card_number').isString(),
    body('data.phone').isString()
]

export const UpdateTenantProfileValidator = [
    body('data.display_name,').isString(),
    body('data.image_url').isString()
]