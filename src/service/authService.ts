import { AxiosError } from 'axios';
import axios from '../config/axios';
import ServerError from '../error/ServerError';

enum RegistrationErrorCode {
    CHAT_ALREADY_VERIFIED = 'CHAT_ALREADY_VERIFIED',
    WRONG_PHONE_NUMBER = 'WRONG_PHONE_NUMBER',
    INTERNAL = 'INTERNAL',
}

enum VerificationErrorCode {
    TOKEN_NOT_CREATED = 'TOKEN_NOT_CREATED',
    ATTEMPTS_ARE_OVER = 'ATTEMPTS_ARE_OVER',
    WRONG_CODE = 'WRONG_CODE',
    TOKEN_WAS_KILLED = 'TOKEN_WAS_KILLED',
    INTERNAL = 'INTERNAL',
}

enum ClientStatus {
    UNREGISTERED = 'UNREGISTERED',
    REGISTERED = 'REGISTERED',
    NOT_VERIFIED = 'NOT_VERIFIED',
}

// TODO refactor

const registration = async function (chat: number, phoneNumber: string | undefined): Promise<any> {
    const rejectInternal = async (): Promise<RegistrationErrorCode> => {
        return await Promise.reject(RegistrationErrorCode.INTERNAL);
    };

    return await axios
        .post<ServerError>('/auth/registration', { chat, phoneNumber })
        .then(async () => {
            return await Promise.resolve();
        })
        .catch(async (err: AxiosError<ServerError, any>) => {
            const response = err.response;

            if (response != null) {
                const code: RegistrationErrorCode | undefined = (RegistrationErrorCode as any)[
                    response.data.code
                ];

                if (code !== undefined) {
                    return await Promise.reject(code);
                }
            }

            return await rejectInternal();
        });
};

const verification = async function (chat: number, code: string | undefined): Promise<any> {
    const rejectInternal = async (): Promise<VerificationErrorCode> => {
        return await Promise.reject(VerificationErrorCode.INTERNAL);
    };

    return await axios
        .post<ServerError>('/auth/verification', { chat, code })
        .then(async () => {
            return await Promise.resolve();
        })
        .catch(async (err: AxiosError<ServerError, any>) => {
            const response = err.response;

            if (response != null) {
                const code: VerificationErrorCode | undefined = (VerificationErrorCode as any)[
                    response.data.code
                ];

                if (code !== undefined) {
                    return await Promise.reject(code);
                }
            }

            return await rejectInternal();
        });
};

const clientStatus = async function (chat: number): Promise<any> {
    return await axios.get<ClientStatus>(`/auth/client/${chat}/status`).then(async response => {
        return await Promise.resolve(response.data);
    });
};

export {
    registration,
    verification,
    clientStatus,
    RegistrationErrorCode,
    VerificationErrorCode,
    ClientStatus,
};
