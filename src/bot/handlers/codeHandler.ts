import TelegramBot from 'node-telegram-bot-api';
import { code } from '../service/codeService';

const setupCodeHandler = function (bot: TelegramBot): void {
    bot.onText(/\/code/, (message: TelegramBot.Message) => {
        code(bot, message);
    });
};

export default setupCodeHandler;
