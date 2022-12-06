import TelegramBot from 'node-telegram-bot-api';
import { help } from '../service/helpService';

const setupHelpHandler = function (bot: TelegramBot): void {
    bot.onText(/\/help/, (message: TelegramBot.Message) => {
        const chat = message.chat.id;
        help(bot, chat);
    });
};

export default setupHelpHandler;
