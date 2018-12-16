import { InvoiceDocument } from "./invoice-document";
import { InvoiceItem, Invoice } from "./invoice";

class InvoiceService {
    // getNextNumberForYear(year: number): string{

    // }

    public getSumPrice(invoice: Invoice): number {
        return invoice.items.reduce((sum, item) => sum + this.getItemSumPrice(item), 0);
    }

    public getItemSumPrice(invoiceItem: InvoiceItem): number {
        return invoiceItem.unitPrice * invoiceItem.unitCount;
    }
}

export const invoiceService = new InvoiceService();
