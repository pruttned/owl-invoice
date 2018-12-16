import { ClientDocument } from './client-document';
import { db } from '../db';
class ClientService {
    getAll(): Promise<ClientDocument[]> {
        return db.clients.getAll();
    }
}

export const clientService = new ClientService();