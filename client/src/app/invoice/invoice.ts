import Decimal from 'decimal.js';

export interface Invoice {
    id: string;
    issueDate: Date,
    dueDate: Date,
    number: string;
    client: {
        name: string,
        color: string,
        initials: string
    },
    items: InvoiceItem[]
}

export interface InvoiceItem {
    text: string,
    unitCount: Decimal
    unitPrice: Decimal,
}
