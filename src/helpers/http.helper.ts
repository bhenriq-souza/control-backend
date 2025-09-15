import { Response } from 'express';

type Metadata = Record<string, unknown>;

export const HttpHelper = {
    ok<T>(res: Response, data: T, meta?: Metadata) {
        return res.status(200).json({ success: true, data, ...(meta ? { meta } : {}) });
    },
    created<T>(res: Response, data: T, meta?: Metadata) {
        return res.status(201).json({ success: true, data, ...(meta ? { meta } : {}) });
    },
    fail(res: Response, status: number, message: string, details?: Record<string, unknown>) {
        return res.status(status).json({ success: false, message, ...(details ? details : {}) });
    },
};
