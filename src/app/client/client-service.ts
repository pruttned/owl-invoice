import { InvoiceDocument } from './../invoice/invoice-document';
import { ClientDocument } from './client-document';
import { db } from '../db';
import { slugify } from '../../common/slugify';

class ClientService {
    getAll(): Promise<ClientDocument[]> {
        return db.clients.getAll();
    }
    getById(id: string): Promise<ClientDocument> {
        return db.clients.single(id);
    }
    create(client: ClientDocument): Promise<ClientDocument> {
        client = { ...client, id: slugify(client.name) };
        return db.clients.create(client);
    }
    update(client: ClientDocument): Promise<ClientDocument> {
        return db.clients.update(client);
    }
    async remove(id: string): Promise<any> {
        let clientInvoices = await db.invoices.getAll({
            where: (invoice: InvoiceDocument) => {
                console.log('invoice.client.id', invoice.client);
                return invoice.client === id;
            }
        })
        if (clientInvoices.length) {
            throw new Error('It is not allowed to remove client with existing invoices');
        }
        return db.clients.remove(id);
    }
}

export const clientService = new ClientService();