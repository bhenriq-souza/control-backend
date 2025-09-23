import { z } from 'zod';
import { Bank } from '../entities';

export type GetAllBanksResponse = Bank[];
export type GetBankByIdResponse = Bank | null;
export type CreateBankResponse = {
    bankId: string;
};
export type UpdateBankResponse = {
    bankId: string;
    updated: boolean;
};
export type DeleteBankResponse = boolean;

export const BankSchema = z.object({
    febraban: z.string().min(1).max(3),
    name: z.string().min(1).max(100),
});

export const UpdateBankRequestSchema = z.object({
    bankId: z.string().min(1),
    bank: BankSchema.partial(),
});

export const DeleteBankRequestSchema = z.object({
    bankId: z.string().min(1),
});

export type CreateBankRequestData = z.infer<typeof BankSchema>;

export type UpdateBankRequestData = z.infer<typeof UpdateBankRequestSchema>;

export type GetBankByIdRequestParams = {
    bankId: string;
};
export type DeleteBankRequestParams = {
    bankId: string;
};
