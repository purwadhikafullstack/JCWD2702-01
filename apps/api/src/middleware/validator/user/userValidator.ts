import { body } from "express-validator";

export const UpdateUserProfileValidator = [
    body('data.display_name').isString(),
    body('data.image_url').isString()
]