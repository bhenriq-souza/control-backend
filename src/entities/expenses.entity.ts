import type { Document } from 'mongodb';

export class Expense extends Document {
    bankAccountId: string;
    status: string;
    category: string;
    creditCardId?: string;
    value: number;
    description: string;
    installments: boolean;
    createdAt: Date;
    createdBy: string;
    fixed: boolean;
    dueTo: Date;
    lastUpdate: Date;
    lastModifier?: string;
    totalInstallments?: number;
    actualInstallment?: number;
    observations?: string;
}
