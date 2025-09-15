import { container } from 'tsyringe';
import { ILogger } from '../interfaces';
import { LoggerServiceSymbol } from '../symbols';

export function requestTimingMiddleware(req, res, next) {
    const startNs = process.hrtime.bigint();

    (res.locals as any).__reqStartNs = startNs;

    res.on('finish', () => {
        const endNs = process.hrtime.bigint();
        const durationMs = Number(endNs - startNs) / 1e6;

        const logger = container.resolve<ILogger>(LoggerServiceSymbol);

        const correlationId = req.headers['x-correlation-id'] as string;

        const contentLength = res.getHeader('content-length');

        (res.locals as any).durationMs = durationMs;

        logger.info('Request completed', {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: Number(durationMs.toFixed(2)),
            contentLength,
            correlationId,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
        });
    });

    next();
}
