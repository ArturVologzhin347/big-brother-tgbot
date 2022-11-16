/* eslint-disable @typescript-eslint/no-namespace */
import { config } from 'dotenv';

config();

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly PORT: number;
            readonly TGBOT_URL: string;
            readonly SERVER_URL: string;
            readonly TELEGRAM_TOKEN: string;
        }
    }
}
