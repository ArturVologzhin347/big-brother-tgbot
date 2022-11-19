import TelegramBot from 'node-telegram-bot-api';

const help = function (bot: TelegramBot, chat: number): void {
    void (async () => {
        const message = `Введите /start для верификации`;
        await bot.sendMessage(chat, message);
    })();
};

export { help };
