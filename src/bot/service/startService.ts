import TelegramBot from 'node-telegram-bot-api';
import {
    registration,
    clientStatus,
    ClientStatus,
    RegistrationErrorCode,
} from '../../service/authService';
import { help } from '../service/helpService';

const start = function (bot: TelegramBot, message: TelegramBot.Message): void {
    void (async () => {
        const chat = message.chat.id;
        await clientStatus(chat).then(async (status: ClientStatus) => {
            switch (status) {
                case ClientStatus.REGISTERED: {
                    help(bot, chat);
                    break;
                }
                case ClientStatus.UNREGISTERED: {
                    const message = 'Введите свой номер телефона: \n' + 'Пример: 79501234567';
                    const phoneNumberPrompt = await bot.sendMessage(chat, message, {
                        reply_markup: {
                            force_reply: true,
                        },
                    });

                    bot.onReplyToMessage(chat, phoneNumberPrompt.message_id, message => {
                        void (async () => {
                            const phoneNumber = message.text;
                            await registration(chat, phoneNumber)
                                .then(async () => {
                                    await bot.sendMessage(
                                        chat,
                                        'На ваш номер телефона была отправлена СМС с кодом. \n' +
                                            'Введите команду /code',
                                    );
                                })
                                .catch(async (code: RegistrationErrorCode) => {
                                    switch (code) {
                                        case RegistrationErrorCode.CHAT_ALREADY_VERIFIED: {
                                            await bot.sendMessage(chat, 'Вы уже зарегестрированы!');
                                            break;
                                        }

                                        case RegistrationErrorCode.WRONG_PHONE_NUMBER: {
                                            await bot.sendMessage(
                                                chat,
                                                'Неверный номер телефона, попробуйте снова. /start',
                                            );
                                            break;
                                        }
                                    }
                                });
                        })();
                    });

                    break;
                }
                case ClientStatus.NOT_VERIFIED: {
                    await bot.sendMessage(
                        chat,
                        'Используйте команду /code чтобы ввести секретный код',
                    );
                    break;
                }

                default: {
                    throw new Error(`Value ${String(status)} not implemented in ClientStatus enum`);
                }
            }
        });
    })();
};

export { start };
