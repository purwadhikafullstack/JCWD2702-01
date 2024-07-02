import { Router } from 'express';
import { allGuestReviews, postReply } from './reviewControllerTenantSide';
const router = Router();

router.get('/', allGuestReviews);
router.post('/', postReply);

export default router;
