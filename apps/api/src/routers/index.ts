import { SampleController } from '@/features/sample/sampleController';
import { Router } from 'express';

export class SampleRouter {
  private router: Router;
  private sampleController: SampleController;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.sampleController.getSampleData);
    this.router.get('/id/:id', this.sampleController.getSampleDataById);
    this.router.get('/search', this.sampleController.getSampleDataByQuery);
  }

  getRouter(): Router {
    return this.router;
  }
}
