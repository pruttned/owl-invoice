export interface Invoice {
    number: string;
    variableSymbol: string;
    issueDate: Date;
    dueDate: Date;

    client: Client;
    items: InvoiceItem[];
}

export interface Client {
    name: string;
    address: string;
    taxId: string; //DIC
    businessId: string; //ICO
    vatNumber: string; //IC DPH    
}

export interface InvoiceItem {
    text: string;
    unitCount: number;
    unitPrice: number;
}