import micromatch from 'micromatch';
import { IQuery } from "./query";
import { IDocumentFs } from './document-fs';
import sift from 'sift';
import { isFunction } from 'lodash'
import { Document } from './document';

export class DocumentCollection<T extends Document> {
    constructor(private name: string, private documentFs: IDocumentFs) {
    }

    async getAll(query?: IQuery<T>): Promise<T[]> {
        let collection = await this.documentFs.getCollection(this.name);
        if (query && query.id) {
            collection = collection.filter(d => micromatch.isMatch(d, query.id!!));
        }

        let docs = await Promise.all(collection.map(doc => this.documentFs.getDocument(this.name, doc)));

        if (query && query.where) {
            if (isFunction(query.where)) {
                docs = docs.filter(query.where);
            } else {
                docs = sift(query.where, docs);
            }
        }

        return docs;
    }

    create(client: T): Promise<T> {
        return this.documentFs.createDocument(this.name, client);
    }
}