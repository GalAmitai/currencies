import { Request, Response, Router } from 'express';
import healthCheckController from '../controllers/healthCheckController';

const router: Router = Router();

router.get('/', healthCheckController.healthCheck);

export default router;