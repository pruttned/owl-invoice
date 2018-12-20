import { Decimal } from 'decimal.js'

export interface InvoiceDocument {
    id: string;
    number: string,
    client: string,

    items: InvoiceItem[]
}

export interface InvoiceItem {
    text: String,
    unitCount: Decimal
    unitPrice: Decimal,
}