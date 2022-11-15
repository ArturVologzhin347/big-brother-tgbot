import TelegramBot from 'node-telegram-bot-api';
import setupErrorHandlers from './bot/errorHandlers';
import log4js from 'log4js';

const log = log4js.getLogger('bot.ts');

const TOKEN = '5604952344:AAF82wRbf7grHvsoWHcYH6-WlFqJQUjBqKs'; // TODO WEBHOOK!

const bot = new TelegramBot(TOKEN, { polling: { interval: 20, autoStart: false } });

setupErrorHandlers(bot);

const chats: number[] = [];

bot.onText(/\/start/, (message: TelegramBot.Message) => {
    void (async () => {
        const chatId = message.chat.id;
        console.log(chatId);
        chats.push(chatId);
        await bot.sendMessage(chatId, 'Subscribe to notifications, target: all');
    })();
});

const polling: () => void = () => {
    void (async () => {
        await bot.startPolling().then(() => {
            log.info('Start TG Bot polling...');
        });
    })();
};

polling();

export { bot, chats };
