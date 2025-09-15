export type HttpResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    meta?: Record<string, unknown>;
    [key: string]: unknown;
};
