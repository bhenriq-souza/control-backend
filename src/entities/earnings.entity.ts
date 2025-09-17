import type { Document } from 'mongodb';

export class Earning extends Document {
    category: string;
    status: string;
    bankAccountId: string;
    description: string;
    value: number;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    lastUpdate?: Date;
    lastModifier?: string;
    observations?: string;
}
