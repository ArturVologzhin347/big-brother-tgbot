import TelegramBot from 'node-telegram-bot-api';
import log4js from 'log4js';

const logger = log4js.getLogger('errorHandler.ts');

const setupErrorHandler = function (bot: TelegramBot): void {
    void (async () => {
        bot.on('polling_error', error => {
            void (async () => {
                console.log(error);
                logger.error('Telegram API polling error!');

                // await bot.startPolling({ restart: true }).then(() => {
                // log.warn('Try restart TG Bot polling...');
                // });
            })();
        });
    })();
};

export default setupErrorHandler;
