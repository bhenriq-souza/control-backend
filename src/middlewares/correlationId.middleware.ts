import { Request, Response, NextFunction } from 'express';

export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;

    const correlationId = headers['x-correlation-id'];

    if (!correlationId) {
        return res.status(400).json({ error: 'Missing correlation header' });
    }

    (req as any).correlationId = correlationId;

    next();
}
