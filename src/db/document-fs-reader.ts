import path from 'path';
import fs from 'fs';
import globP from 'glob';
import { promisify } from 'util';
import yaml from 'js-yaml';
import { IDocumentFsWatcher, IOnChangeArgs } from './document-fs-watcher';

const glob = promisify(globP);
const readFile = promisify(fs.readFile);

const docFileExt = 'yaml';
const docFileGlob = `*.${docFileExt}`;

export class DocumentFsReader {
    private index: { [id: string]: IndexDocument[] | null } = {};
    private onFsChangeBdn: (args: any) => void;

    constructor(private dir: string, private watcher: IDocumentFsWatcher) {
        this.onFsChangeBdn = args => this.onFsChange(args);
        this.watcher.addListener(this.onFsChangeBdn);
    }
    close() {
        this.watcher.removeListener(this.onFsChangeBdn);
    }

    async readDocument(collection: string, id: string): Promise<any> {
        const file = this.getDocumentPath(collection, id);
        const fileContent = await readFile(file, 'utf-8');
        return yaml.safeLoad(fileContent);
    }

    async getDocuments(collection: string): Promise<string[]> {
        if (!this.index[collection]) {
            this.index[collection] = (await glob(path.join(this.dir, collection, docFileGlob))).map(p => ({
                id: path.basename(p, path.extname(p)),
                path: p
            }));
        }

        return this.index[collection]!.map(f => f.id);
    }

    private onFsChange(args: IOnChangeArgs) {
        const collection = this.getCollectionFromPath(args.file);
        if (this.index) {
            this.index[collection] = null;
        }
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