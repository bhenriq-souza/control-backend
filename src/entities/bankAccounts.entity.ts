import type { Document } from 'mongodb';

export class BankAccount extends Document {
    bankId: string;
    accountNumber: string;
    accountType: string;
    description?: string;
    createdAt: Date;
    createdBy: string;
    lastUpdate: Date;
    lastModifier?: string;
    balance: number;
    active: boolean;
    creditLimit?: number;
}
