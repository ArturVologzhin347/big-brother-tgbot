import log4js from 'log4js';
import TelegramBot from 'node-telegram-bot-api';

const log = log4js.getLogger(__filename);

const setupErrorHandlers: (bot: TelegramBot) => void = (bot: TelegramBot) => {
    bot.on('polling_error', () => {
        log.error('Telegram API polling error!');
    });
};

export default setupErrorHandlers;
