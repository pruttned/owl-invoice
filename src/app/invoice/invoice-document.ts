import { Decimal } from 'decimal.js';
import { DocumentProcessor } from '../../common/document-db/document-processor';

export interface InvoiceDocument {
    id: string;
    number: string, //TODO: remove?
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

export class InvoiceDocumentProcessor implements DocumentProcessor<InvoiceDocument>{
    fromDb(document: InvoiceDocument): InvoiceDocument {
        document.items.forEach(item => {
            item.unitCount = new Decimal(item.unitCount);
            item.unitPrice = new Decimal(item.unitPrice);
        });
        return document;
    }
}