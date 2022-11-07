import log4js from 'log4js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
require('./config/config');
require('./config/logger');

const log = log4js.getLogger('app.ts');

require('./bot');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

const PORT = process.env['PORT'];
app.listen(PORT, (): void => {
    log.info(`Express server listening on port ${PORT}, with PID: ${process.pid}`);
    log.info(`Server adress: http://localhost:${PORT}`);
});
