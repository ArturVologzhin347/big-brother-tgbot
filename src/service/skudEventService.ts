import SkudEvent from '../model/SkudEvent';
import moment from 'moment';
import { bot } from '../bot';

const sendSkudEvent: (chat: number, event: SkudEvent) => void = (chat, event) => {
    void (async () => {
        const student = event.student;
        const status = event.type === 'ENTER' ? 'в колледже с' : 'вышел из колледжа в';
        const date = moment(new Date(event.timestamp));
        date.locale('ru');
        const studentName = `${student.name} ${student.surname}`;
        const message = `${studentName} ${status} ${date.format('DD MMM, h:mm:ss')}`;
        await bot.sendMessage(chat, message);
    })();
};

export { sendSkudEvent };
