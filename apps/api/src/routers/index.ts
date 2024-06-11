import express, { Router } from 'express';
import cors from 'cors';
import SignupRouter from '../features/auth/signup/signupRouter'
import VerfiedRouter from '../features/auth/verification/verifiedRouter'
import SigninRouter from '../features/auth/signin/signinRouter'
import TenantRouter from '../features/tenant/tenantRouter'
import UserRouter from '../features/user/userRouter'
import SignouRouter from '../features/auth/signout/signoutRouter'


const router = Router();
router.use(cors());
router.use(express.json());
router.use('*/image', express.static('src/public/image'));

router.use('/signup', SignupRouter)
router.use('/verification', VerfiedRouter)
router.use('/signin', SigninRouter)
router.use('/signout', SignouRouter)
router.use('/tenant', TenantRouter)
router.use('/user', UserRouter)

export default router;
