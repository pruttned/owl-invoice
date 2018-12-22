import { WriteDocumentOptions, IDocumentFs } from './../../common/document-db/document-fs';
import { DocumentCollection } from './../../common/document-db/document-collection';
import { InvoiceDocument } from '../invoice/invoice-document';
import { ClientDocument } from '../client/client-document';
import { Document } from '../../common/document-db/document';

// class DocumentFsMock implements IDocumentFs {
//     getDocumentResult: any;
//     getCollectionResult: string[] = [];
//     writeDocumentResult: any;
//     close() { }
//     getDocument(collection: string, id: string): Promise<any> {
//         return Promise.resolve(this.getDocumentResult);
//     }
//     getCollection(collection: string): Promise<string[]> {
//         return Promise.resolve(this.getCollectionResult);
//     }
//     writeDocument(collection: string, document: Document, options?: WriteDocumentOptions): Promise<any> {
//         return Promise.resolve(this.writeDocumentResult);
//     }
// }
const DocumentFsMock = jest.fn<IDocumentFs>(() => ({
    getCollection: jest.fn(),
    getDocument: jest.fn()
}));

export class DbMock {
    invoicesDocumentFs = new DocumentFsMock();
    clientsDocumentFs = new DocumentFsMock();
    invoices = new DocumentCollection<InvoiceDocument>('invoice', this.invoicesDocumentFs);
    clients = new DocumentCollection<ClientDocument>('client', this.clientsDocumentFs);
}
export const db = new DbMock();
