import { Router } from 'express';
import { uploader } from '@/middleware/Uploader';
import {
  newBooking,
  cancelBooking,
  confirmPayment,
  checkBooking,
  allBookingsByUser,
} from './bookingControllerUserSide';
import {
  UploadPaymentDataValidator,
  CancelBookingDataValidator,
  BookingDataValidator,
} from '@/middleware/validator/user/transactionValidator';
import { handleErrorValidator } from '@/middleware/validator/handleErrorExpressValidator';
const router = Router();

router.post(
  '/:room_typesId',
  BookingDataValidator,
  handleErrorValidator,
  newBooking,
);
router.put(
  '/confirmation',
  UploadPaymentDataValidator,
  handleErrorValidator,
  uploader,
  confirmPayment,
);
router.put(
  '/cancellation/:bookingId',
  CancelBookingDataValidator,
  handleErrorValidator,
  cancelBooking,
);
router.get('/:bookingId', checkBooking);
router.get('/', allBookingsByUser);
export default router;
