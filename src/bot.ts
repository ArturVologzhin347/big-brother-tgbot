import TelegramBot from 'node-telegram-bot-api';
import setupErrorHandlers from './bot/errorHandlers';

const TOKEN = process.env['TOKEN']!;

const bot = new TelegramBot(TOKEN, { polling: true });

setupErrorHandlers(bot);

// bot.on('message', (message: TelegramBot.Message) => {
// const chatId = message.chat.id;
//
// bot.sendMessage(chatId, 'Hello').catch(() => {});
// });

export default bot;
