import { Router } from 'express';
import { allPastStays, postReview } from './reviewControllerUserSide';
const router = Router();

router.get('/all', allPastStays);
router.post('/', postReview);

export default router;
