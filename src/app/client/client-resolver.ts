import { clientService } from './client-service';
export const clientResolver = {
    Query: {
        clients(object: any, args: any) {
            return clientService.getAll();
        },
        client(object: any, args: any) {
            return clientService.getById(args.id);
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