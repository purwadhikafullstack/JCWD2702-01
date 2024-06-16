import { Router } from 'express';
import { getBookings, confirmBooking } from './bookingControllerTenantSide';
import { ConfirmBookingDataValidator } from '@/middleware/validator/tenant/transactionValidator';
import { handleErrorValidator } from '@/middleware/validator/handleErrorExpressValidator';
const router = Router();

router.get('/', getBookings);
router.put(
  '/confirmation/',
  ConfirmBookingDataValidator,
  handleErrorValidator,
  confirmBooking,
);

export default router;
