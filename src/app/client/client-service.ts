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
}

export const clientService = new ClientService();