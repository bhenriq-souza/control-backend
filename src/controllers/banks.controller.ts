import { inject, injectable } from 'tsyringe';
import type { Response, Request } from 'express';

import type { IBankController, IBankService, ILogger } from '../interfaces';

import { Bank } from '../entities';
import { HttpHelper } from '../helpers';
import { BankServiceSymbol, HttpHelperSymbol, LoggerServiceSymbol } from '../symbols';
import {
    BankSchema,
    CreateBankResponse,
    DeleteBankRequestParams,
    DeleteBankRequestSchema,
    DeleteBankResponse,
    GetAllBanksResponse,
    GetBankByIdResponse,
    UpdateBankRequestData,
    UpdateBankRequestSchema,
    UpdateBankResponse,
} from '../types';

@injectable()
export class BanksController implements IBankController {
    constructor(
        @inject(BankServiceSymbol) private readonly service: IBankService,
        @inject(HttpHelperSymbol) private readonly http: typeof HttpHelper,
        @inject(LoggerServiceSymbol) private readonly logger: ILogger,
    ) {}

    public async getAllBanks(req: Request, res: Response): Promise<Response<GetAllBanksResponse>> {
        try {
            const banks = await this.service.getAllBanks();

            return this.http.ok<GetAllBanksResponse>(res, banks);
        } catch (error) {
            const handled = {
                error,
                ...(error.error && error.error instanceof Error
                    ? { inner: error.error.stack }
                    : {}),
            };

            if (error.message && error.stack) {
                this.logger.error(`Erro encontrado no método getAllBanks: ${error.message}`, {
                    ...handled,
                    correlationId: res.locals.correlationId,
                });
                return this.http.fail(res, 500, error.message, handled);
            }

            this.logger.error(`Erro inesperado no método getAllBanks: ${error.message}`, {
                ...handled,
                correlationId: res.locals.correlationId,
            });

            return this.http.fail(res, 500, 'Erro inesperado no método getAllBanks', handled);
        }
    }

    public async createBank(req: Request, res: Response): Promise<Response<CreateBankResponse>> {
        try {
            const validation = BankSchema.safeParse(req.body);

            if (!validation.success) {
                const issues = validation.error.issues.map((i) => ({
                    path: i.path.join('.'),
                    message: i.message,
                    code: i.code,
                }));
                this.logger.error('Erro de validação no método createBank', {
                    errors: issues,
                    body: req.body,
                    correlationId: res.locals.correlationId,
                });
                return this.http.fail(res, 400, 'Dados inválidos', {
                    errors: issues,
                });
            }

            const data = validation.data;

            const bankId = await this.service.createBank(data as Bank);

            return this.http.ok<CreateBankResponse>(res, { bankId });
        } catch (error) {
            const handled = {
                error,
                ...(error.error && error.error instanceof Error
                    ? { inner: error.error.stack }
                    : {}),
            };

            if (error.message && error.stack) {
                this.logger.error(`Erro encontrado no método createBank: ${error.message}`, {
                    ...handled,
                    correlationId: res.locals.correlationId,
                });
                return this.http.fail(res, 500, error.message, handled);
            }

            this.logger.error(`Erro inesperado no método createBank: ${error.message}`, {
                ...handled,
                correlationId: res.locals.correlationId,
            });

            return this.http.fail(res, 500, 'Erro inesperado no método createBank', handled);
        }
    }

    public async getBankById(req: Request, res: Response): Promise<Response<GetBankByIdResponse>> {
        try {
            const { bankId } = req.params;

            if (!bankId) {
                this.logger.error('bankId não foi fornecido no método getBankById', {
                    params: req.params,
                    correlationId: res.locals.correlationId,
                });

                return this.http.fail(res, 400, 'bankId é obrigatório');
            }

            const bank = await this.service.getBankById(bankId);

            return this.http.ok<GetBankByIdResponse>(res, bank);
        } catch (error) {
            const handled = {
                error,
                ...(error.error && error.error instanceof Error
                    ? { inner: error.error.stack }
                    : {}),
            };

            if (error.message && error.stack) {
                this.logger.error(`Erro encontrado no método getBankById: ${error.message}`, {
                    ...handled,
                    correlationId: res.locals.correlationId,
                });
                return this.http.fail(res, 500, error.message, handled);
            }

            this.logger.error(`Erro inesperado no método getBankById: ${error.message}`, {
                ...handled,
                correlationId: res.locals.correlationId,
            });

            return this.http.fail(res, 500, 'Erro inesperado no método getBankById', handled);
        }
    }

    public async updateBank(
        req: Request<null, null, UpdateBankRequestData>,
        res: Response,
    ): Promise<Response<UpdateBankResponse>> {
        try {
            const validation = UpdateBankRequestSchema.safeParse(req.body);

            if (!validation.success) {
                const issues = validation.error.issues.map((i) => ({
                    path: i.path.join('.'),
                    message: i.message,
                    code: i.code,
                }));
                this.logger.error('Erro de validação no método updateBank', {
                    errors: issues,
                    body: req.body,
                    correlationId: res.locals.correlationId,
                });
                return this.http.fail(res, 400, 'Dados inválidos', {
                    errors: issues,
                });
            }

            const data = validation.data;

            const updated = await this.service.updateBank(data.bankId, data.bank as Partial<Bank>);

            return this.http.ok<UpdateBankResponse>(res, { ...data, updated });
        } catch (error) {
            const handled = {
                error,
                ...(error.error && error.error instanceof Error
                    ? { inner: error.error.stack }
                    : {}),
            };

            if (error.message && error.stack) {
                this.logger.error(`Erro encontrado no método updateBank: ${error.message}`, {
                    ...handled,
                    correlationId: res.locals.correlationId,
                });
                return this.http.fail(res, 500, error.message, handled);
            }

            this.logger.error(`Erro inesperado no método updateBank: ${error.message}`, {
                ...handled,
                correlationId: res.locals.correlationId,
            });

            return this.http.fail(res, 500, 'Erro inesperado no método updateBank', handled);
        }
    }

    public async deleteBank(
        req: Request<DeleteBankRequestParams>,
        res: Response,
    ): Promise<Response<DeleteBankResponse>> {
        try {
            const validation = DeleteBankRequestSchema.safeParse(req.params);

            if (!validation.success) {
                const issues = validation.error.issues.map((i) => ({
                    path: i.path.join('.'),
                    message: i.message,
                    code: i.code,
                }));
                this.logger.error('Erro de validação no método deleteBank', {
                    errors: issues,
                    body: req.body,
                    correlationId: res.locals.correlationId,
                });
                return this.http.fail(res, 400, 'Dados inválidos', {
                    errors: issues,
                });
            }

            const { bankId } = validation.data;

            const deleted = await this.service.deleteBank(bankId);

            return this.http.ok<DeleteBankResponse>(res, deleted);
        } catch (error) {
            const handled = {
                error,
                ...(error.error && error.error instanceof Error
                    ? { inner: error.error.stack }
                    : {}),
            };

            if (error.message && error.stack) {
                this.logger.error(`Erro encontrado no método deleteBank: ${error.message}`, {
                    ...handled,
                    correlationId: res.locals.correlationId,
                });
                return this.http.fail(res, 500, error.message, handled);
            }

            this.logger.error(`Erro inesperado no método deleteBank: ${error.message}`, {
                ...handled,
                correlationId: res.locals.correlationId,
            });

            return this.http.fail(res, 500, 'Erro inesperado no método deleteBank', handled);
        }
    }
}
