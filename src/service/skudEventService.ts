import SkudEvent from '../model/SkudEvent';
import { bot, chats } from '../bot';

// TODO
const notifyAboutSkudEvent: (event: SkudEvent) => void = (event: SkudEvent) => {
    void (async () => {
        for (const chat of chats) {
            await bot.sendMessage(chat, event.student.name);
        }
    })();
};

export { notifyAboutSkudEvent };
