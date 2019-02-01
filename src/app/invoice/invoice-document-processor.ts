import { Decimal } from 'decimal.js';
import { DocumentProcessor } from '../../common/document-db/document-processor';
import { InvoiceDocument } from './invoice-document';

export class InvoiceDocumentProcessor implements DocumentProcessor<InvoiceDocument> {
    fromDb(document: InvoiceDocument): InvoiceDocument {
        document.items && document.items.forEach(item => {
            item.unitCount = new Decimal(item.unitCount);
            item.unitPrice = new Decimal(item.unitPrice);
        });
        return document;
    }
    toDb(document: InvoiceDocument): any {
        return {
            ...document,
            items: document.items.map(item => ({
                ...item,
                unitPrice: item.unitPrice.toString(),
                unitCount: item.unitCount.toString()
            }))
        };
    }
}
