import { SupplierDocument } from './supplier-document';
import { db } from '../db';
import { repoService } from '../repo/repo-service';

const supplierDefaultId = 'default';

class SupplierService {
    async get(): Promise<SupplierDocument> {
        let supplierDocument = await this.tryGet();
        if (!supplierDocument) {
            supplierDocument = {
                id: supplierDefaultId,
                'name': 'xx',
                'address': 'xx',
                'taxId': 'xx',
                'businessId': 'xx',
                'vatNumber': 'xx',
                'register': 'xx',
                'iban': 'xx',
                'bank': 'xx',
                'phoneNumber': 'xx',
                'email': 'xx'
            };
        }
        return supplierDocument;
    }

    async update(supplier: SupplierUpdateModel): Promise<SupplierDocument> {
        let supplierDocument = await this.tryGet();
        let isNew = !supplierDocument;
        if (!supplierDocument) {
            supplierDocument = {} as SupplierDocument;
        }
        supplierDocument = { ...supplierDocument, ...supplier, id: supplierDefaultId };
        supplierDocument = isNew ?
            await db.suppliers.create(supplierDocument) :
            await db.suppliers.update(supplierDocument);
        await repoService.commitAndPush(`supplier(${supplierDocument.id}):${isNew ? 'updated' : 'create'}`);
        return supplierDocument;
    }

    private tryGet(): Promise<SupplierDocument | undefined> {
        return db.suppliers.singleOrDefault(supplierDefaultId);
    }
}

export const supplierService = new SupplierService();

interface SupplierUpdateModel {
    name: string;
    address: string;
    taxId: string; //DIC
    businessId: string; //ICO
    vatNumber: string; //IC DPH
    register: string;
    iban: string;
    bank: string;
    phoneNumber: string;
    email: string;
}