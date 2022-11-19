import TelegramBot from 'node-telegram-bot-api';
import handlers from './bot/handlers';
import log4js from 'log4js';
import axios from 'axios';

const log = log4js.getLogger('bot.ts');

const TOKEN = process.env['TELEGRAM_TOKEN'];
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const WEBHOOK_URL = `${process.env['TGBOT_URL']}/webhook/${TOKEN}`;

const bot = new TelegramBot(TOKEN, { polling: { interval: 20, autoStart: false } });

void (async () => {
    await handlers.setup(bot);
})();

const polling: () => void = () => {
    void (async () => {
        await bot.startPolling().then(() => {
            log.info('Start TG Bot polling...');
        });
    })();
};

const webhook: () => void = () => {
    void (async () => {
        try {
            const response = await axios.get(`${TELEGRAM_API}/setWebhook`, {
                params: {
                    url: WEBHOOK_URL,
                    drop_pending_updates: true,
                },
            });
            log.debug(response.data);
        } catch (error) {
            log.error(error);
        }
    })();
};

export { bot, polling, webhook };
