import Notification from '../model/Notification';
import * as core from 'express-serve-static-core';
import log4js from 'log4js';
import { handleNotification } from '../service/notificationService';
import { NextFunction, Request, Response } from 'express';

const logger = log4js.getLogger('apiHandlers.ts');

const sendNotification: (
    req: Request<core.ParamsDictionary, any, Notification>,
    res: Response,
    next: NextFunction,
) => void = (req, res, next) => {
    const notification = req.body;
    logger.info(notification);
    handleNotification(notification);
    return res.status(200).json(null);
};

export { sendNotification };
