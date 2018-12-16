import { ClientDocument } from './client-document';
import { clientService } from './client-service';
export const clientResolver = {
    Query: {
        clients(object: any, args: any) {
            return clientService.getAll();
        }
    },
    Mutation: {
        createClient(root: any, args: any): Promise<any> {
            return clientService.create(args.input);
        },
        updateClient(root: any, args: any): Promise<any> {
            return clientService.update(args.input);
        }
    }
}