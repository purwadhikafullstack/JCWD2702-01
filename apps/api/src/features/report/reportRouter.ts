import { Router } from 'express';
import { allSales } from './reportController';
const router = Router();

router.get('/', allSales);

export default router;
