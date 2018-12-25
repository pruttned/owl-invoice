
import Decimal from 'decimal.js';

class InvoiceService {
    getSumPrice(invoice: Invoice): Decimal {
        if (!invoice || !invoice.items || !invoice.items.length) {
            return new Decimal(0);
        }
        return invoice.items.reduce((sum, item) => sum.add(item.unitPrice.mul(item.unitCount)), new Decimal(0));
    }
}

export interface Invoice {
    id: string;
    issueDate: Date,
    dueDate: Date,
    number: string;
    client: {
        name: string
    },
    items: InvoiceItem[]
}

export interface InvoiceItem {
    text: string,
    unitCount: Decimal
    unitPrice: Decimal,
}


export const invoiceService = new InvoiceService(); 