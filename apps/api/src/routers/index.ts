import express, { Router } from 'express';
import cors from 'cors';
import SignupRouter from '../features/auth/signup/signupRouter'
import VerfiedRouter from '../features/auth/verification/verifiedRouter'
import SigninRouter from '../features/auth/signin/signinRouter'
import TenantRouter from '../features/tenant/tenantRouter'
import UserRouter from '../features/user/userRouter'
import SignouRouter from '../features/auth/signout/signoutRouter'

// Define Router
const router = Router();
router.use(cors());
router.use(express.json()); // Body Parser
router.use('*/image', express.static('src/public/image'));

router.use('/signup', SignupRouter) //SIGNUP
router.use('/verification', VerfiedRouter) //VERIFICATION
router.use('/signin', SigninRouter) //SIGNIN
router.use('/signout', SignouRouter) //SIGNOUT
router.use('/tenant', TenantRouter) //TENANT
router.use('/user', UserRouter) //USER

export default router;
