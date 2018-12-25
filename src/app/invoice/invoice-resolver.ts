import { invoiceService } from './invoice-service';
import { clientService } from '../client/client-service';
import { invoiceTemplateDefinitionService } from './invoice-template-definition-service';
export const invoiceResolver = {
    Query: {
        invoices(object: any, args: any) {
            return invoiceService.getAll();
        },
        invoice(object: any, args: any) {
            return invoiceService.getById(args.id);
        },
        invoiceTemplateDefinitions(object: any, args: any) {
            return invoiceTemplateDefinitionService.getAllForList();
        },
    },
    Invoice: {
        client(invoice: any, args: any, context: any) {
            return clientService.getById(invoice.client);
        }
    },
    Mutation: {
        createInvoice(root: any, args: any): Promise<any> {
            return invoiceService.create(args.input);
        },
        updateInvoice(root: any, args: any): Promise<any> {
            return invoiceService.update(args.input);
        },
        removeInvoice(root: any, args: any): Promise<any> {
            return invoiceService.remove(args.id);
        }
    }
}