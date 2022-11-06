/* eslint-disable @typescript-eslint/no-namespace */
import { config } from 'dotenv';

config();

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly PORT: number;
        }
    }
}
