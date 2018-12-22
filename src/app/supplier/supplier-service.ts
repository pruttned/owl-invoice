import { SupplierDocument } from './supplier-document';
import { db } from '../db';

const supplierDefaultId = 'default';

class SupplierService {
    get(): Promise<SupplierDocument | undefined> {
        return db.suppliers.singleOrDefault(supplierDefaultId);
    }

    async update(supplier: SupplierUpdateModel): Promise<SupplierDocument> {
        let supplierDocument = await this.get();
        let isNew = !supplierDocument;
        if (!supplierDocument) {
            supplierDocument = {} as SupplierDocument;
        }
        supplierDocument = { ...supplierDocument, ...supplier, id: supplierDefaultId };
        return isNew ?
            db.suppliers.create(supplierDocument) :
            db.suppliers.update(supplierDocument);
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