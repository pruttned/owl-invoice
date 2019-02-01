import { Decimal } from 'decimal.js';

export interface InvoiceDocument {
    id: string;
    client: string,
    issueDate: Date,
    dueDate: Date,

    items: InvoiceItem[]
}

export interface InvoiceItem {
    text: string,
    unitCount: Decimal
    unitPrice: Decimal,
}