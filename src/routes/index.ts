import { Router } from 'express';
import { sendNotification } from '../endpoints';
const router = Router();

router.post('/notification/send', sendNotification);

export default router;
