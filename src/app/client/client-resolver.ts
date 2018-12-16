import { clientService } from './client-service';
export const clientResolver = {
    Query: {
        clients(object: any, args: any) {
            return clientService.getAll();
        }
    }
}