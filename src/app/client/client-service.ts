import { ConflictError } from './../../common/errors/conflict-error';
import { InvoiceDocument } from './../invoice/invoice-document';
import { ClientDocument } from './client-document';
import { db } from '../db';
import { slugify } from '../../common/slugify';
import { repoService } from '../repo/repo-service';

class ClientService {
    getAll(): Promise<ClientDocument[]> {
        return db.clients.getAll();
    }
    getById(id: string): Promise<ClientDocument> {
        return db.clients.single(id);
    }
    async create(client: ClientDocument): Promise<ClientDocument> {
        client = { ...client, id: slugify(client.name) };
        await db.clients.create(client);
        await repoService.commitAndPush(`client(${client.id}):created`);
        return client;
    }
    async update(client: ClientDocument): Promise<ClientDocument> {
        let clientDocument = await db.clients.update(client);
        await repoService.commitAndPush(`client(${clientDocument.id}):updated`);
        return clientDocument;
    }
    async remove(id: string): Promise<any> {
        let clientInvoices = await db.invoices.getAll({
            where: (invoice: InvoiceDocument) => {
                console.log('invoice.client.id', invoice.client);
                return invoice.client === id;
            }
        })
        if (clientInvoices.length) {
            throw new ConflictError('It is not allowed to remove client with existing invoices');
        }
        await db.clients.remove(id);
        await repoService.commitAndPush(`client(${id}):removed`);
    }
}

export const clientService = new ClientService();