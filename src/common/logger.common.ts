import winston from 'winston';
import { inject, injectable } from 'tsyringe';

import { ILogger } from '../interfaces';
import { EnvServiceSymbol } from '../symbols';
import { EnvService } from './env.common';

class ChildWinstonLogger implements ILogger {
    constructor(private readonly logger: winston.Logger) {}
    child(meta: Record<string, unknown> = {}) {
        return new ChildWinstonLogger(this.logger.child(meta));
    }
    debug(msg: string, meta?: Record<string, unknown>) {
        this.logger.debug(msg, meta);
    }
    info(msg: string, meta?: Record<string, unknown>) {
        this.logger.info(msg, meta);
    }
    warn(msg: string, meta?: Record<string, unknown>) {
        this.logger.warn(msg, meta);
    }
    error(msg: string, meta?: Record<string, unknown> | Error) {
        const metadata = {
            ...(meta instanceof Error ? { err: meta.stack } : meta),
        };
        this.logger.error(msg, metadata);
    }
}

@injectable()
export class LoggerService implements ILogger {
    private readonly base: winston.Logger;
    private serviceName: string;
    private environment: string;
    private logLevel: string;

    constructor(@inject(EnvServiceSymbol) private readonly env: EnvService) {
        this.serviceName = this.env.getEnv('APPLICATION_NAME');
        this.environment = this.env.getEnv('ENV');
        this.logLevel = this.env.getEnv('LOG_LEVEL');

        const transports: winston.transport[] = [new winston.transports.Console()];

        const flattenMetadata = winston.format((info) => {
            if (info.metadata && typeof info.metadata === 'object') {
                Object.assign(info, info.metadata);
                delete info.metadata;
            }
            return info;
        });

        this.base = winston.createLogger({
            transports,
            level: this.logLevel,
            defaultMeta: { service: this.serviceName, env: this.environment },
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                flattenMetadata(),
                winston.format.json(),
            ),
        });
    }

    child(meta: Record<string, unknown> = {}): ILogger {
        const child = this.base.child(meta);
        return new ChildWinstonLogger(child);
    }

    debug(msg: string, meta?: Record<string, unknown>) {
        this.base.debug(msg, meta);
    }
    info(msg: string, meta?: Record<string, unknown>) {
        this.base.info(msg, meta);
    }
    warn(msg: string, meta?: Record<string, unknown>) {
        this.base.warn(msg, meta);
    }
    error(msg: string, meta?: Record<string, unknown> | Error) {
        const metadata = {
            ...(meta instanceof Error ? { err: meta } : meta),
        };
        this.base.error(msg, metadata);
    }
}
