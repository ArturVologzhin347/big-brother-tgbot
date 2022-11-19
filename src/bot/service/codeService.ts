import TelegramBot from 'node-telegram-bot-api';

import {
    ClientStatus,
    clientStatus,
    verification,
    VerificationErrorCode,
} from '../../service/authService';
import { start } from './startService';

const code = function (bot: TelegramBot, message: TelegramBot.Message): void {
    void (async () => {
        const chat = message.chat.id;
        await clientStatus(chat).then(async (status: ClientStatus) => {
            switch (status) {
                case ClientStatus.UNREGISTERED: {
                    start(bot, message);
                    break;
                }

                case ClientStatus.NOT_VERIFIED: {
                    const message = 'Введите код из СМС:';
                    const codePrompt = await bot.sendMessage(chat, message, {
                        reply_markup: {
                            force_reply: true,
                        },
                    });
                    bot.onReplyToMessage(chat, codePrompt.message_id, message => {
                        void (async () => {
                            const code = message.text;
                            await verification(chat, code)
                                .then(async () => {
                                    await bot.sendMessage(
                                        chat,
                                        'Аутентификация пройдена.\nВведите /help для помощи.',
                                    );
                                })
                                .catch(async (code: VerificationErrorCode) => {
                                    let message: string;

                                    switch (code) {
                                        case VerificationErrorCode.WRONG_CODE: {
                                            message = 'Неверный код, попробуйте снова. \n/code';
                                            break;
                                        }
                                        case VerificationErrorCode.ATTEMPTS_ARE_OVER: {
                                            message =
                                                'Слишком много неудачных попыток. Попробуйте снова.\n/start';
                                            break;
                                        }

                                        default: {
                                            message =
                                                'Что-то пошло не так. Попробуйте снова.\n/start';
                                            break;
                                        }
                                    }

                                    await bot.sendMessage(chat, message);
                                });
                        })();
                    });
                    break;
                }
            }
        });
    })();
};

export { code };
