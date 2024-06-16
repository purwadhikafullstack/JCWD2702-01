import { Router } from 'express';
import {
  getRoomTypeById,
  getSampleData,
  getSampleDataById,
  getSampleDataByQuery,
} from './sampleController';

const router = Router();

router.get('/', getSampleData);
router.get('/id/:id', getSampleDataById);
router.get('/room/:id', getRoomTypeById);
router.get('/search', getSampleDataByQuery);

export default router;
