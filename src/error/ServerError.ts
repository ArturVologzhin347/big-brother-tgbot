interface ServerError {
    readonly code: string;
    readonly message: string;
    readonly trace?: string;
    readonly status: number;
}

export default ServerError;
