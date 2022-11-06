import log4js from 'log4js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

require('./config/config');
require('./config/logger');

const log = log4js.getLogger('app.ts');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// TODO 
const PORT = process.env['PORT'] || 5050;

app.listen(PORT, (): void => {
    log.info(`Express server listening on port ${PORT}, with PID: ${process.pid}`);
});
