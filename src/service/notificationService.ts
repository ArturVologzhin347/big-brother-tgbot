import Notification from '../model/Notification';
import SkudEvent from '../model/SkudEvent';
import { sendSkudEvent } from './skudEventService';

const handleNotification: (notification: Notification) => void = notification => {
    const chat = notification.chat;

    switch (notification.type) {
        case 'SKUD_EVENT': {
            const event: SkudEvent = JSON.parse(notification.payload);
            sendSkudEvent(chat, event);
            break;
        }
    }
};

export { handleNotification };
