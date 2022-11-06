import log4js from 'log4js';

const configuration: log4js.Configuration = {
    appenders: {
        tofile: { type: 'file', filename: 'log/logs.log' },
        out: { type: 'stdout' },
    },
    categories: {
        default: { appenders: ['out', 'tofile'], level: 'info' },
    },
};

log4js.configure(configuration);
