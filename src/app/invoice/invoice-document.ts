import { Decimal } from 'decimal.js';

export interface InvoiceDocument {
    id: string;
    client: string,
    issueDate: Date,
    deliveryDate: Date,
    dueDate: Date,
    number: string,

    items: InvoiceItem[]
}

export interface InvoiceItem {
    text: string,
    unitCount: Decimal
    unitPrice: Decimal,
}