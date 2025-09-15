import { container } from 'tsyringe';
import { LoggerService } from '../common';
import { LoggerServiceSymbol } from '../symbols';

export function loggingRequestMiddleware(req, res, next) {
    const { method, url, body, query, params, headers } = req;
    const logger = container.resolve<LoggerService>(LoggerServiceSymbol);
    const correlationId = headers['x-correlation-id'] || 'N/A';

    logger.info(`Incoming request: ${req.method} ${req.url}`, {
        method,
        url,
        body,
        query,
        params,
        correlationId,
    });

    next();
}
