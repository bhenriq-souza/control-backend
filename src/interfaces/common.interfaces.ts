import type express from 'express';

export interface IBaseRoute {
    getRouter(): express.Router;
}

export interface IApp {
    build(): Promise<ReturnType<typeof express>>;
}

export interface ILogger {
    child(meta?: Record<string, unknown>): ILogger;
    debug(msg: string, meta?: Record<string, unknown>): void;
    info(msg: string, meta?: Record<string, unknown>): void;
    warn(msg: string, meta?: Record<string, unknown>): void;
    error(msg: string, meta?: Record<string, unknown> | Error): void;
}

export interface IEnvService {
    getEnv(key: string): string;
}

export interface HttpBaseResponse<T> {
    status: number;
    message: string;
    data?: T;
}
