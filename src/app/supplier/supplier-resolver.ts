import { supplierService } from './supplier-service';
export const supplierResolver = {
    Query: {
        supplier(object: any, args: any) {
            return supplierService.get();
        }
    },
    Mutation: {
        updateSupplier(root: any, args: any): Promise<any> {
            return supplierService.update(args.input);
        }
    }
}