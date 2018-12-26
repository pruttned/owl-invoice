import Decimal from 'decimal.js';
import { Client } from '../client/client';

export interface Invoice {
    id: string;
    issueDate: Date;
    dueDate: Date;
    number: string;
    client: Client;
    items: InvoiceItem[];
}

export interface InvoiceItem {
    text: string;
    unitCount: Decimal;
    unitPrice: Decimal;
}
