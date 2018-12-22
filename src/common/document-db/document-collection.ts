import micromatch from 'micromatch';
import { Query, IdQuery } from "./query";
import { IDocumentFs } from './document-fs';
import sift from 'sift';
import { isFunction } from 'lodash'
import { Document } from './document';
import { find } from 'lodash';
import { Namespace } from 'protobufjs';
import { isEmpty } from 'lodash';

export class DocumentCollection<T extends Document> {
    constructor(private name: string, private documentFs: IDocumentFs) {
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
            return await this.documentFs.getDocument(this.name, id);
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

        return docs;
    }

    create(document: T): Promise<T> {
        return this.documentFs.writeDocument(this.name, document, { noOverride: true });
    }
    update(document: T): Promise<T> {
        return this.documentFs.writeDocument(this.name, document);
    }
}