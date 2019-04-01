import { InvoiceDocument, InvoiceItem as InvoiceItemDoc } from './invoice-document';
import { db } from '../db';
import { max, padStart } from 'lodash';
import { repoService } from '../repo/repo-service';

class InvoiceService {
    getAll(): Promise<InvoiceDocument[]> {
        return db.invoices.getAll();
    }
    getById(id: string): Promise<InvoiceDocument> {
        return db.invoices.single(id);
    }
    async create(invoice: InvoiceCreateModel): Promise<InvoiceDocument> {
        const number = await this.getNextNumberInYear(invoice.issueDate.getFullYear());
        let invoiceDocument: InvoiceDocument = {
            ...invoice,
            id: number,
            number,
        };
        invoiceDocument = await db.invoices.create(invoiceDocument);
        await repoService.commitAndPush(`invoice(${invoiceDocument.id}):created`);
        return invoiceDocument;
    }
    async update(invoice: InvoiceUpdateModel): Promise<InvoiceDocument> {
        let invoiceDocument = await db.invoices.single(invoice.id);
        invoiceDocument = { ...invoiceDocument, ...invoice };
        invoiceDocument = await db.invoices.update(invoiceDocument);

        await repoService.commitAndPush(`invoice(${invoice.id}):updated`);

        return invoiceDocument;

    }
    async remove(id: string): Promise<any> {
        await db.invoices.remove(id);
        await repoService.commitAndPush(`invoice(${id}):removed`);
    }

    async getNextNumberInYear(year: number): Promise<string> {
        const idsInYear = await db.invoices.getAllIds({ id: `${year}*` });
        if (!idsInYear.length) {
            return `${year}001`;
        }
        const invoiceNumbers = idsInYear.map(id => parseInt(id.substring(4)));
        return year + padStart(((max(invoiceNumbers) || 0) + 1).toString(), 3, '0');
    }

}

export const invoiceService = new InvoiceService();

interface InvoiceCreateModel {
    issueDate: Date,
    deliveryDate: Date,
    dueDate: Date,
    client: string,
    items: InvoiceItemDoc[]
}

interface InvoiceUpdateModel {
    id: string,
    issueDate: Date,
    deliveryDate: Date,
    dueDate: Date,
    client: string,
    items: InvoiceItemDoc[]
}