import { body, query } from 'express-validator';
import { getBilling } from '@/features/booking/user/bookingServiceUserSide';
import { IReqAccessToken } from '@/helpers/Token';

export const BookingDataValidator = [
  body('start_date').isString().withMessage('date date'),
  body('end_date').isString(),
  body('num_of_guests').isNumeric(),
  body('total_price').isNumeric(),
  body('payment_typesId').isNumeric(),
];

export const UploadPaymentDataValidator = [
  query('bookingId')
    .exists()
    .bail()
    .custom(async (bookingId, { req }) => {
      const reqToken = req as IReqAccessToken;
      const { uid } = reqToken.payload.data;

      const billing = await getBilling(bookingId);

      console.log('uid', uid);

      if (billing) {
        if (billing.usersId !== uid) {
          return Promise.reject('User does not match with user ID in booking.');
        }
        return Promise.resolve();
      } else {
        return Promise.reject('Billing ID does not exist.');
      }
    }),
  query('type').exists().withMessage('Type is required.'),
];

export const CancelBookingDataValidator = [
  query('bookingId')
    .exists()
    .bail()
    .custom(async (bookingId, { req }) => {
      const reqToken = req as IReqAccessToken;
      const { uid } = reqToken.payload.data;

      const billing = await getBilling(bookingId);

      console.log('uid', uid);

      if (billing) {
        if (billing.usersId !== uid) {
          return Promise.reject('User does not match with user ID in booking.');
        }
        return Promise.resolve();
      } else {
        return Promise.reject('Billing ID does not exist.');
      }
    }),
];
