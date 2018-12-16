import { InvoiceDocument } from './invoice-document';
import { db } from '../db';
class InvoiceService {
    getAll(): Promise<InvoiceDocument[]> {
        return db.invoices.getAll();
    }
    getById(id: string): Promise<InvoiceDocument> {
        return db.invoices.single(id);
    }
    create(invoice: InvoiceDocument): Promise<InvoiceDocument> {
        return db.invoices.create(invoice);
    }
    update(invoice: InvoiceDocument): Promise<InvoiceDocument> {
        return db.invoices.update(invoice);
    }
}

export const invoiceService = new InvoiceService();