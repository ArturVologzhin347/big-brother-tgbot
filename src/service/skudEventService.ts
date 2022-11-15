import SkudEvent from '../model/SkudEvent';
import { bot, chats } from '../bot';

const notifyAboutSkudEvent: (event: SkudEvent) => void = (event: SkudEvent) => {
    void (async () => {
        for (const chat of chats) {
            let message: string; // TODO

            if (event.student == null) {
                message = `Аноним ${event.cardId} ${event.type} в ${event.timestamp}`;
            } else {
                message =
                    `${event.student.name} ` +
                    `${event.student.surname} ` +
                    `${event.student.patronymic} ` +
                    `${event.type === 'ENTER' ? 'вошёл в колледж' : 'вышел из колледжа'} в ` +
                    `${event.timestamp}`;
            }

            await bot.sendMessage(chat, message);
        }
    })();
};

export { notifyAboutSkudEvent };
