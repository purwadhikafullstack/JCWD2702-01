import { body, query } from 'express-validator';

export const NewTenantValidator = [
  body('data.display_name,').notEmpty().withMessage('display name is required'),
  body('data.image_url').isString(),
  body('data.id_card_number').isString(),
  body('data.phone').isString(),
];

export const UpdateTenantProfileValidator = [
  body('data.display_name,').isString(),
  body('data.image_url').isString(),
];

export const ConfirmBookingValidator = [
  query('status').notEmpty().escape(),
  query('bookingId').notEmpty().escape(),
];

export const NewListingValidator = [
    body(['listingData.title', 'listingData.description', 'listingData.country', 'listingData.categoriesId', 'listingData.address', 'listingData.contact_person', 'listingData.location_coordinate', 'listingData.city', 'listingData.listing_facilities']).notEmpty().withMessage('data must complete'),
    body('listingData.location_coordinate')
        .notEmpty()
        .withMessage('Location coordinate must be provided')
        .custom((value) => {
            const coordinate = JSON.parse(value);
            if (!coordinate.lat || !coordinate.lng) {
                throw new Error('Both latitude and longitude are required');
            }
            return true;
        }),
    body('listingImages').custom((value, { req }) => {
        if (!req.files || !req.files.listingImages) {
            throw new Error('Listing images are required');
        }
        const files = Array.isArray(req.files.listingImages) ? req.files.listingImages : [req.files.listingImages];
        if (files.length > 5) {
            throw new Error('You can upload a maximum of 5 images');
        }
        return true;
    })
]
