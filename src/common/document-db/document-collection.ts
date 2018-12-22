import micromatch from 'micromatch';
import { Query, IdQuery } from "./query";
import { IDocumentFs } from './document-fs';
import sift from 'sift';
import { isFunction } from 'lodash'
import { Document } from './document';
import { find } from 'lodash';
import { Namespace } from 'protobufjs';
import { isEmpty } from 'lodash';
import { DocumentProcessor } from './document-processor';

export class DocumentCollection<T extends Document> {
    constructor(private name: string, private documentFs: IDocumentFs, private documentProcessor?: DocumentProcessor<T>) {
    }

    async single(id: string): Promise<T> {
        let document = await this.singleOrDefault(id);
        if (!document) {
            throw new Error(`Document with id '${id}' not found in collection '${this.name}'`);
        }
        return document;
    }
    async singleOrDefault(id: string): Promise<T | undefined> {
        let collection = await this.documentFs.getCollection(this.name);
        if (collection.indexOf(id) >= 0) {
            let document = await this.documentFs.getDocument(this.name, id);
            return document && this.fromDb(document);
        }
    }

    async getAllIds(query?: IdQuery): Promise<string[]> {
        let collection = await this.documentFs.getCollection(this.name);
        if (query && query.id) {
            collection = collection.filter(d => micromatch.isMatch(d, query.id!!));
        }

        return collection;
    }

    async getAll(query?: Query<T>): Promise<T[]> {
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

        return docs.map(this.fromDb);
    }

    create(document: T): Promise<T> {
        return this.documentFs.writeDocument(this.name, document, { noOverride: true });
    }
    update(document: T): Promise<T> {
        return this.documentFs.writeDocument(this.name, document);
    }
    remove(id: string): Promise<boolean> {
        return this.documentFs.removeDocument(this.name, id);
    }

    private fromDb(document: T): T {
        return this.documentProcessor ? this.documentProcessor.fromDb(document) : document;
    }
}