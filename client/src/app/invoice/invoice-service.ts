import { Invoice } from "./invoice";
import Decimal from 'decimal.js';

class InvoiceService {
    getSumPrice(invoiceOrInvoices: Invoice | Invoice[]): Decimal {
        if (!invoiceOrInvoices) {
            return new Decimal(0);
        }

        let invoices = Array.isArray(invoiceOrInvoices) ? invoiceOrInvoices : [invoiceOrInvoices];
        return invoices.reduce((sum, invoice) => sum.add(this.getInvoiceSumPrice(invoice)), new Decimal(0));
    }

    fromResponse(invoice: Invoice): Invoice {
        if (!invoice) {
            return invoice;
        }

        return {
            ...invoice,
            dueDate: new Date(Date.parse(invoice.dueDate as any)),
            issueDate: new Date(Date.parse(invoice.issueDate as any)),
            items: (invoice.items && invoice.items.map(item => ({
                ...item,
                unitCount: new Decimal(item.unitCount),
                unitPrice: new Decimal(item.unitPrice),
            }))) || []
        }
    }

    private getInvoiceSumPrice(invoice: Invoice): Decimal {
        if (!invoice || !invoice.items || !invoice.items.length) {
            return new Decimal(0);
        }
        return invoice.items.reduce((sum, item) => sum.add(item.unitPrice.mul(item.unitCount)), new Decimal(0));
    }
}

export const invoiceService = new InvoiceService(); 