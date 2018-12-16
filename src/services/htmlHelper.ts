import dateformat from 'dateformat';
import { InvoiceItem, Invoice } from '../models/invoice';

export class HtmlHelper {
    public static capitalizeFirstLetter(input: string): string {
        if (!input || !input.length) return input;
        return input.charAt(0).toUpperCase() + (input.length > 1 ? input.substr(1) : '');
    }

    public static formatDate(input: Date): string {
        return dateformat(input, 'd. m. yyyy');
    }

    public static preserveLineEndings(input: string): string | null {
        if (!input) return null;
        return input.replace('\n', '<br>');
    }

    public static getInvoiceItemSumPrice(invoiceItem: InvoiceItem): number {
        return invoiceItem.unitPrice * invoiceItem.unitCount;
    }

    public static getInvoiceSumPrice(invoice: Invoice): number {
        return invoice.items.reduce((sum, item) => sum + this.getInvoiceItemSumPrice(item), 0);
    }
}