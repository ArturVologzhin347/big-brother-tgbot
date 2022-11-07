import Handler from './Handler';

import SkudEvent from '../model/SkudEvent';
import { notifyAboutSkudEvent } from '../service/skudEventService';

const notifyAboutSkudEventHanlder: Handler = async (req, res, next) => {
    const event: SkudEvent = req.body;
    console.log(event);
    notifyAboutSkudEvent(event);
    return res.status(200).json('OK');
};

export { notifyAboutSkudEventHanlder };
