import SkudEvent from '../model/SkudEvent';
import { bot } from '../bot';

const sendSkudEvent: (chat: number, event: SkudEvent) => void = (chat, event) => {
    void (async () => {
        const message = JSON.stringify(event);
        await bot.sendMessage(chat, message);
    })();
};

export { sendSkudEvent };
