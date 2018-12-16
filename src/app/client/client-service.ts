import { ClientDocument } from './client-document';
import { db } from '../db';
class ClientService {
    getAll(): Promise<ClientDocument[]> {
        return db.clients.getAll();
    }
    create(client: ClientDocument): Promise<ClientDocument> {
        return db.clients.create(client);
    }
}

export const clientService = new ClientService();