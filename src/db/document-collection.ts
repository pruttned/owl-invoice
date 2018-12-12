import micromatch from 'micromatch';
import { IQuery } from "./query";
import { IDocumentFs } from './document-fs';


export class DocumentCollection {
    constructor(private name: string, private fsReader: IDocumentFs) {
    }

    async getAll(query?: IQuery) {
        let docs = await this.fsReader.getCollection(this.name);
        if (query && query.id) {
            docs = docs.filter(d => micromatch.isMatch(d, query.id));
        }
        return Promise.all(docs.map(doc => this.fsReader.getDocument(this.name, doc)));
    }
}