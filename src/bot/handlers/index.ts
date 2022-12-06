import TelegramBot from 'node-telegram-bot-api';
import setupCodeHandler from './codeHandler';
import setupErrorHandler from './errorHandler';
import setupHelpHandler from './helpHandler';
import setupStartHandler from './startHandler';

const setup = async function (bot: TelegramBot): Promise<void> {
    try {
        setupErrorHandler(bot); // -> Bot polling_error

        setupHelpHandler(bot); // -> /help
        setupStartHandler(bot); // -> /start
        setupCodeHandler(bot); // -> /code
    } catch (e) {
        return await Promise.reject(e);
    }
};

export default { setup };
