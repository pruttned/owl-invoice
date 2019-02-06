class ApiProxy {
    private apiBaseUrl = 'http://localhost:3001/api';

    exportInvoice(invoiceId: string, templateDefinition: InvoiceTemplateDefinition) {
        window.open(`${this.apiBaseUrl}/invoices/export?invoiceId=${encodeURIComponent(invoiceId)}&templateDefinitionId=${templateDefinition}`);
    }
}

export const apiProxy = new ApiProxy();

export enum InvoiceTemplateDefinition {
    DefaultSK = 'defaultSK',
    DefaultAT = 'defaultAT',
}