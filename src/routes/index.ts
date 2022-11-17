import { Router } from 'express';
import { sendNotification } from '../handler/apiHandlers';
const router = Router();

router.post('/notification/send', sendNotification);

export default router;
