import { Router } from 'express';
import { notifyAboutSkudEventHanlder } from '../handler/apiHandlers';
const router = Router();

// router.use('/api', api);

router.post('/skud', notifyAboutSkudEventHanlder);

export default router;
