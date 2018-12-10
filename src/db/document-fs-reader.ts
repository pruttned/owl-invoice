import path from 'path';
import fs from 'fs';
import globP from 'glob';
import { promisify } from 'util';
import yaml from 'js-yaml';
import { DocumentFsWatcher } from './document-fs-watcher';

const glob = promisify(globP);
const readFile = promisify(fs.readFile);

const docFileExt = 'yaml';
const docFileGlob = `*.{docFileExt}`;

export class DocumentFsReader {
    index: { [id: string]: IndexDocument[] | null } = {};
    onFsChangeBdn: (args: any) => void;

    constructor(private dir: string, private watcher: DocumentFsWatcher) {
        this.onFsChangeBdn = args => this.onFsChange(args);
    }
    close() {
        this.watcher.removeListener(this.onFsChangeBdn);
    }

    onFsChange(file: string) {
        const collection = this.getCollectionFromPath(file);
        if (this.index) {
            this.index[collection] = null;
        }
    }

    async readDocument(collection: string, id: string): Promise<any> {
        const file = this.getDocumentPath(collection, id);
        const fileContent = await readFile(file, 'utf-8');
        return yaml.safeLoad(fileContent);
    }

    async getDocuments(collection: string): Promise<string[]> {
        if (!this.index[collection]) {
            this.index[collection] = (await glob(path.join(this.dir, docFileGlob))).map(p => ({
                id: path.basename(p, path.extname(p)),
                path: p
            }));
        }

        return this.index[collection]!.map(f => f.id);
    }

    private getCollectionFromPath(file: string): string {
        return path.basename(path.dirname(file));
    }

    private getDocumentPath(collection: string, id: string) {
        return path.join(this.dir, collection, `${id}.${docFileExt}`);
    }
}

interface IndexDocument {
    id: string;
    path: string;
}