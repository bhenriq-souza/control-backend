// import { Document } from 'mongodb';
import type { Response, Request } from 'express';

import { Bank } from '../entities';
import { BaseSchema } from '../database';
import {
    CreateBankResponse,
    DeleteBankRequestParams,
    DeleteBankResponse,
    GetAllBanksResponse,
    GetBankByIdRequestParams,
    GetBankByIdResponse,
    UpdateBankRequestData,
    UpdateBankResponse,
} from '../types';

export interface IBankService {
    getAllBanks(): Promise<Bank[]>;
    getBankById(id: string): Promise<Bank | null>;
    createBank(bank: Bank): Promise<string>;
    updateBank(id: string, bank: Partial<Bank>): Promise<boolean>;
    deleteBank(id: string): Promise<boolean>;
}
export interface IBankController {
    getAllBanks(req: Request, res: Response): Promise<Response<GetAllBanksResponse>>;
    createBank(req: Request, res: Response): Promise<Response<CreateBankResponse>>;
    getBankById(
        req: Request<GetBankByIdRequestParams>,
        res: Response,
    ): Promise<Response<GetBankByIdResponse>>;
    updateBank(
        req: Request<null, null, UpdateBankRequestData>,
        res: Response,
    ): Promise<Response<UpdateBankResponse>>;
    deleteBank(
        req: Request<DeleteBankRequestParams>,
        res: Response,
    ): Promise<Response<DeleteBankResponse>>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IBankRepository extends BaseSchema {}
