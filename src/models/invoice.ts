export interface Invoice {
    number: number;
    issueDate: Date;
    dueDateOffset: Date;

    client: Client;
    items: InvoiceItem[];
}

export interface Client {

}

export interface InvoiceItem {
    text: string;
    unitCount: number;
    unitPrice: number;
}
