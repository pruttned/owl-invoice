import { ClientDocument } from './client/client-document';
import { InvoiceDocument } from './invoice/invoice-document';
import { DocumentCollection } from './../common/document-db/document-collection';
import { DocumentFsWatcher } from './../common/document-db/document-fs-watcher';
import { DocumentFs } from './../common/document-db/document-fs';

class Db {
    private documentFs: DocumentFs | null = null;
    private documentFsWatcher: DocumentFsWatcher | null = null;
    private _invoices: DocumentCollection<InvoiceDocument> | null = null;
    private _clients: DocumentCollection<ClientDocument> | null = null;

    get invoices(): DocumentCollection<InvoiceDocument> {
        this.checkIsInit();
        return this._invoices!;
    }
    get clients(): DocumentCollection<ClientDocument> {
        this.checkIsInit();
        return this._clients!;
    }

    init(dir: string) {
        if (this.documentFsWatcher) {
            throw new Error('Db is already initialized')
        }
        this.documentFsWatcher = new DocumentFsWatcher(dir);
        this.documentFs = new DocumentFs(dir, this.documentFsWatcher);

        this._invoices = new DocumentCollection<InvoiceDocument>('invoice', this.documentFs);
        this._clients = new DocumentCollection<ClientDocument>('client', this.documentFs);
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