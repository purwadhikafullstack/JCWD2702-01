import { body, query } from 'express-validator';
import { getBilling } from '@/features/booking/user/bookingServiceUserSide';
import { IReqAccessToken } from '@/helpers/Token';

export const ConfirmBookingDataValidator = [
  query('bookingId')
    .exists()
    .bail()
    .custom(async (bookingId, { req }) => {
      const reqToken = req as IReqAccessToken;
      const { uid } = reqToken.payload.data;

      const billing = await getBilling(bookingId);

      if (billing) {
        if (billing.room_type?.listing.tenant.user.uid !== uid) {
          return Promise.reject(
            'Tenant ID does not match with listing owner ID in the booking.',
          );
        }
        return Promise.resolve();
      } else {
        return Promise.reject('Billing ID does not exist.');
      }
    }),
  query('status')
    .exists()
    .custom((status) => {
      if (Number(status) > 5 || Number(status) < 1) {
        return Promise.reject('Invalid status.');
      }
      return Promise.resolve();
    }),
];
