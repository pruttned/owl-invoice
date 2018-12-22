import { ClientDocument } from './client/client-document';
import { InvoiceDocument, InvoiceDocumentProcessor } from './invoice/invoice-document';
import { DocumentCollection } from './../common/document-db/document-collection';
import { DocumentFsWatcher } from './../common/document-db/document-fs-watcher';
import { DocumentFs } from './../common/document-db/document-fs';
import { SupplierDocument } from './supplier/supplier-document';

class Db {
    private documentFs: DocumentFs | null = null;
    private documentFsWatcher: DocumentFsWatcher | null = null;
    private _invoices: DocumentCollection<InvoiceDocument> | null = null;
    private _clients: DocumentCollection<ClientDocument> | null = null;
    private _suppliers: DocumentCollection<SupplierDocument> | null = null;

    get invoices(): DocumentCollection<InvoiceDocument> {
        this.checkIsInit();
        return this._invoices!;
    }
    get clients(): DocumentCollection<ClientDocument> {
        this.checkIsInit();
        return this._clients!;
    }
    get suppliers(): DocumentCollection<SupplierDocument> {
        this.checkIsInit();
        return this._suppliers!;
    }

    init(dir: string) {
        if (this.documentFsWatcher) {
            throw new Error('Db is already initialized')
        }
        this.documentFsWatcher = new DocumentFsWatcher(dir);
        this.documentFs = new DocumentFs(dir, this.documentFsWatcher);

        this._invoices = new DocumentCollection<InvoiceDocument>('invoice', this.documentFs, new InvoiceDocumentProcessor());
        this._clients = new DocumentCollection<ClientDocument>('client', this.documentFs);
        this._suppliers = new DocumentCollection<SupplierDocument>('supplier', this.documentFs);
    }

    close() {
        this.documentFs && this.documentFs.close();
        this.documentFsWatcher && this.documentFsWatcher.close();
    }

    private checkIsInit() {
        if (!this.documentFsWatcher) {
            throw new Error('Db has not been initialized')
        }
    }
}

export const db = new Db();