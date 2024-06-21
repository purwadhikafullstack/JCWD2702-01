import { Router } from 'express';
import {
  getSampleData,
  getSampleDataById,
  getSampleDataByQuery,
  categoryData,
  facilitiesData
} from './sampleController';

const router = Router();

router.get('/', getSampleData);
router.get('/id/:id', getSampleDataById);
router.get('/search', getSampleDataByQuery);
router.get('/categories', categoryData)
router.get('/facilities', facilitiesData)

export default router;
