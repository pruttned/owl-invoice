import Decimal from 'decimal.js';
import { Client } from '../client/client';

export interface Invoice {
    id: string;
    issueDate: Date;
    deliveryDate: Date;
    dueDate: Date;
    client: Client;
    items: InvoiceItem[];
}

export interface InvoiceItem {
    text: string;
    unitCount: Decimal;
    unitPrice: Decimal;
}
