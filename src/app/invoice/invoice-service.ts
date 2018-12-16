import { InvoiceDocument } from './invoice-document';
import { db } from '../db';
import { InvoiceItem, Invoice } from "./invoice";

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

    public getSumPrice(invoice: Invoice): number {
        return invoice.items.reduce((sum, item) => sum + this.getItemSumPrice(item), 0);
    }

    public getItemSumPrice(invoiceItem: InvoiceItem): number {
        return invoiceItem.unitPrice * invoiceItem.unitCount;
    }
}

export const invoiceService = new InvoiceService();