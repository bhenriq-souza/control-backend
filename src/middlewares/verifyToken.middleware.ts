import { container } from 'tsyringe';
import type { Request, Response, NextFunction } from 'express';

import { FirebaseAuthProviderSymbol, LoggerServiceSymbol } from '../symbols';
import { FirebaseAuthProvider } from '../providers';
import { LoggerService } from '../common';

export async function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || '';
    const [, token] = authHeader.split(' ');

    if (!token) return res.status(401).json({ error: 'Missing authentication' });

    const provider = container.resolve<FirebaseAuthProvider>(FirebaseAuthProviderSymbol);
    const logger = container.resolve<LoggerService>(LoggerServiceSymbol);

    try {
        const decoded = await provider.verifyToken(token);

        if (!decoded) return res.status(401).json({ error: 'Invalid or expired token' });

        (req as any).uid = decoded.uid;
        (req as any).requester = decoded.email.split('@')[0];

        next();
    } catch (error) {
        logger.error('Error verifying token', { error });
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
