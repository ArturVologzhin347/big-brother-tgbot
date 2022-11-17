import Handler from './Handler';

import Notification from '../model/Notification';
import log4js from 'log4js';
import { handleNotification } from '../service/notificationService';

const logger = log4js.getLogger('apiHandlers.ts');

const sendNotification: Handler = async (req, res, next) => {
    const notification: Notification = req.body;
    logger.info(notification);
    handleNotification(notification);
    return res.status(200).json(null);
};

export { sendNotification };
