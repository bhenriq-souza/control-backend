export type HttpResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    meta?: Record<string, unknown>;
    [key: string]: unknown;
};

export type HttpRequest<T> = {
    body?: T;
    params?: Record<string, string>;
    query?: Record<string, string>;
    headers?: Record<string, string>;
    [key: string]: unknown;
};
