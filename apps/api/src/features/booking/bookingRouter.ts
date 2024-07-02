import { Router } from 'express';
import { tokenVerify } from '@/helpers/Token';
import { isTenantVerify } from '@/middleware/RoleVerify';
import UserSide from './user/bookingRouterUserSide';
import TenantSide from './tenant/bookingRouterTenantSide';
import { updateAutoPayment } from './public/autoPaymentController';

const router = Router();
router.use('/user', tokenVerify, UserSide);
router.use('/tenant', tokenVerify, isTenantVerify, TenantSide);
router.put('/midtrans', updateAutoPayment);
export default router;