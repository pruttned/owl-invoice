import { ClientDocument } from './client/client-document';
import { InvoiceDocument } from './invoice/invoice-document';
import { DocumentCollection } from './../common/document-db/document-collection';
import { DocumentFsWatcher } from './../common/document-db/document-fs-watcher';
import { DocumentFs } from './../common/document-db/document-fs';

class Db {
    private documentFs: DocumentFs | null = null;
    private documentFsWatcher: DocumentFsWatcher | null = null;
    private _documents: DocumentCollection<InvoiceDocument> | null = null;
    private _clients: DocumentCollection<ClientDocument> | null = null;

    get documents(): DocumentCollection<InvoiceDocument> {
        this.checkIsInit();
        return this._documents!;
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