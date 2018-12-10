import yaml from 'js-yaml';
import path from 'path';
import minimatch from 'minimatch';
import { IQuery } from "./query";
import { Document } from './document';
import fs from 'fs';
import { promisify } from 'util';
import globP from 'glob';
import { DocumentFsReader } from './document-fs-reader';

const readFile = promisify(fs.readFile);
const glob = promisify(globP);


export class DocumentCollection {
    constructor(private name: string, private fsReader: DocumentFsReader) {
    }
    // async getAll(query?: IQuery) {
    //     var files = await glob(path.join(this.dir, '*.yaml'));
    //     return Promise.all(files.map(async f => {
    //         var fileContent = await readFile(f, 'utf-8');
    //         return yaml.safeLoad(fileContent);
    //     }))
    // }
    async getAll(query?: IQuery) {
        let docs = await this.fsReader.getDocuments(this.name);
        if (query && query.id) {
            docs = docs.filter(d => minimatch(d, query.id));
        }
        return Promise.all(docs.map(doc => this.fsReader.readDocument(this.name, doc)));
        // var files = await glob(path.join(this.dir, '*.yaml'));
        // return Promise.all(files.map(async f => {
        //     var fileContent = await readFile(f, 'utf-8');
        //     return yaml.safeLoad(fileContent);
        // }))
    }
}