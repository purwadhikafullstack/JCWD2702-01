import { Router } from 'express';
import { allPastStays, postReview } from './reviewControllerUserSide';
const router = Router();

router.get('/', allPastStays);
router.post('/', postReview);

export default router;
