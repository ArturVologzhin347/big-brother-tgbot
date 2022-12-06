import TelegramBot from 'node-telegram-bot-api';
import { start } from '../service/startService';

const setupStartHandler = function (bot: TelegramBot): void {
    bot.onText(/\/start/, (message: TelegramBot.Message) => {
        start(bot, message);
    });
};

export default setupStartHandler;
