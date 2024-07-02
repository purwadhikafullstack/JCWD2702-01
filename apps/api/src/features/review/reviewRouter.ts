import { Router } from 'express';
import { tokenVerify } from '@/helpers/Token';
import { isTenantVerify } from '@/middleware/RoleVerify';
import UserSide from './user/reviewRouterUserSide';
import TenantSide from './tenant/reviewRouterTenantSide';

const router = Router();
router.use('/user', tokenVerify, UserSide);
router.use('/tenant', tokenVerify, isTenantVerify, TenantSide);

export default router;
