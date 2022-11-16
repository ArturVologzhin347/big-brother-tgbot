/* eslint-disable import/first */
require('./config/config');
require('./config/logger');

import log4js from 'log4js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import { polling } from './bot';

const log = log4js.getLogger('app.ts');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.post(`/webhook/${process.env['TELEGRAM_TOKEN']}`, (req, res) => {
    log.debug(req.body);
    res.status(200).json(null);
});

const PORT = process.env['PORT'];
app.listen(PORT, (): void => {
    log.info(`Express server listening on port ${PORT}, with PID: ${process.pid}`);
    log.info(`Server localhost address: http://localhost:${PORT}`);
    log.info(`Server ngrok address: ${process.env['TGBOT_URL']}`);
    // webhook();
    polling();
});
