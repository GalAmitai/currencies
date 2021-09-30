import { Router } from 'express';
import AppController from '../controllers/appController';
import CoinController from '../controllers/coinController';

const router: Router = Router();

router.get('/refresh', CoinController.refresh);
router.get('/get-latest', CoinController.getLatest);
router.get('/get-history', CoinController.getHistory);
router.get('/get-shoutbox', AppController.getShoutbox);
router.get('/set-shoutbox', AppController.setShoutbox);

export default router;