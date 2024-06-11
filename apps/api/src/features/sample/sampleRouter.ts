import { Router } from 'express';
import {
  getSampleData,
  getSampleDataById,
  getSampleDataByQuery,
} from './sampleController';

const router = Router();

router.get('/', getSampleData);
router.get('/id/:id', getSampleDataById);
router.get('/search', getSampleDataByQuery);

export default router;
