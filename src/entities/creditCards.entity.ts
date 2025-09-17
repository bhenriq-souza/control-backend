import type { Document } from 'mongodb';

export class CreditCard extends Document {
    bankAccountId: string;
    name: string;
    closingDay: string;
    billingCycle: number;
    totalCreditLimit: number;
    availableCreditLimit: number;
    createdAt: Date;
    createdBy: string;
    lastUpdate: Date;
    lastModifier?: string;
    active: boolean;
}
