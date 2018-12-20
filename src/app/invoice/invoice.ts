import { Client } from "../client/client";

export interface Invoice {
    number: string;
    variableSymbol: string;
    issueDate: Date;
    dueDate: Date;

    client: Client;
    items: InvoiceItem[];
}

export interface InvoiceItem { //TODO: remove?
    text: string;
    unitCount: number;
    unitPrice: number;
}