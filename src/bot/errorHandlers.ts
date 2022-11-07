import log4js from 'log4js';
import TelegramBot from 'node-telegram-bot-api';

const log = log4js.getLogger(__filename);

const setupErrorHandlers: (bot: TelegramBot) => void = (bot: TelegramBot) => {
    bot.on('polling_error', error => {
        void (async () => {
            console.log(error);
            log.error('Telegram API polling error!');

            // await bot.startPolling({ restart: true }).then(() => {
            // log.warn('Try restart TG Bot polling...');
            // });
        })();
    });
};

export default setupErrorHandlers;
