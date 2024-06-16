import { Router } from 'express';
import { tokenVerify, roleVerify } from '@/helpers/Token';
const router = Router();
import UserSide from './user/bookingRouterUserSide';
import TenantSide from './tenant/bookingRouterTenantSide';

router.use('/user', tokenVerify, UserSide);
router.use('/tenant', tokenVerify, roleVerify, TenantSide);
export default router;
