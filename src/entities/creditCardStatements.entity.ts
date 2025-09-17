import type { Document } from 'mongodb';

export class CreditCardStatement extends Document {
    creditCardId: string;
    balance: number;
    openningDate: Date;
    closingDate: Date;
    dueDate: Date;
}
