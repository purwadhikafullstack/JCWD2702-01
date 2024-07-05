import express, { Router } from 'express';
import cors from 'cors';
import SignupRouter from '../features/auth/signup/signupRouter';
import VerfiedRouter from '../features/auth/verification/verifiedRouter';
import SigninRouter from '../features/auth/signin/signinRouter';
import TenantRouter from '../features/tenant/tenantRouter';
import UserRouter from '../features/user/userRouter';
import SignouRouter from '../features/auth/signout/signoutRouter';
import SampleRouter from '../features/sample/sampleRouter';
import BookingRouter from '@/features/booking/bookingRouter';
import PasswordRouter from '../features/auth/password/passwordRouter';
import PropertyRouter from '../features/property/propertyRouter';
import ReviewRouter from '@/features/review/reviewRouter';
import ReportRouter from '@/features/report/reportRouter';
import { isTenantVerify } from '@/middleware/RoleVerify';
import { tokenVerify } from '@/helpers/Token';

const router = Router();
router.use(cors());
router.use(express.json());
router.use('*/image', express.static('src/public/image'));

router.use('/api/signup', SignupRouter);
router.use('/api/verification', VerfiedRouter);
router.use('/api/signin', SigninRouter);
router.use('/api/signout', SignouRouter);
router.use('/api/tenant', TenantRouter);
router.use('/api/user', UserRouter);
router.use('/api/listings', SampleRouter);
router.use('/api/booking', BookingRouter);
router.use('/api/password', PasswordRouter);
router.use('/api/property', PropertyRouter);
router.use('/api/review', ReviewRouter);
router.use('/api/report', tokenVerify, isTenantVerify, ReportRouter);

export default router;
