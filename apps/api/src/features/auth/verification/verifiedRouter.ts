import { Router } from 'express';
import {
  VerifiedUserAccount,
  CheckAccountVerifiedStatus,
  newVerificationLink,
  verifiedNewUserEmail
} from './verifiedController';
import { uploader } from '@/middleware/Uploader';
import { tokenVerify } from '@/helpers/Token';
import {
  NewVerificationLinkValidator,
  VerifiyAccountValidator,
} from '@/middleware/validator/verification/VerificationValidator';
import { handleErrorValidator } from '@/middleware/validator/handleErrorExpressValidator';

const router = Router();

router.put(
  '/',
  tokenVerify,
  uploader,
  VerifiyAccountValidator,
  handleErrorValidator,
  VerifiedUserAccount,
);
router.get('/status', tokenVerify, CheckAccountVerifiedStatus);
router.post(
  '/reverify',
  NewVerificationLinkValidator,
  handleErrorValidator,
  newVerificationLink,
);
router.put('/new-email-verify', tokenVerify, verifiedNewUserEmail)

export default router;
