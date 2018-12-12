import path from 'path';
import fs from 'fs';
import globP from 'glob';
import { promisify } from 'util';
import yaml from 'js-yaml';
import { IDocumentFsWatcher, IOnChangeArgs } from './document-fs-watcher';
import NodeCache from 'node-cache';
import { DOC_FILE_GLOB, DOC_FILE_EXT, getCollectionFromPath, getIdFromPath } from './document-path';

const glob = promisify(globP);
const readFile = promisify(fs.readFile);

export interface IDocumentFs {
    close(): void;
    getDocument(collection: string, id: string): Promise<any>;
    getCollection(collection: string): Promise<string[]>;
}

export class DocumentFs implements IDocumentFs {
    private index: { [id: string]: IndexDocument[] | null } = {};
    private documentCache = new NodeCache({ stdTTL: 60 * 15, checkperiod: 60 * 5 }); //seconds
    private onFsChangeBdn: (args: any) => void;

    constructor(private dir: string, private watcher: IDocumentFsWatcher) {
        this.onFsChangeBdn = args => this.onFsChange(args);
        this.watcher.addListener(this.onFsChangeBdn);
    }
    close() {
        this.watcher.removeListener(this.onFsChangeBdn);
    }

    async getDocument(collection: string, id: string): Promise<any> {
        const documentCacheKey = this.getDocumentCacheKey(collection, id);
        let document = this.documentCache.get(documentCacheKey);
        if (!document) {
            const file = this.getDocumentPath(collection, id);
            const fileContent = await readFile(file, 'utf-8');
            document = yaml.safeLoad(fileContent);

            this.documentCache.set(documentCacheKey, document);
        }
        return document;
    }

    async getCollection(collection: string): Promise<string[]> {
        if (!this.index[collection]) {
            this.index[collection] = (await glob(path.join(this.dir, collection, DOC_FILE_GLOB))).map(p => ({
                id: path.basename(p, path.extname(p)),
                path: p
            }));
        }

        return this.index[collection]!.map(f => f.id);
    }

    private onFsChange(args: IOnChangeArgs) {
        const collection = getCollectionFromPath(args.file);
        const id = getIdFromPath(args.file);
        const documentCacheKey = this.getDocumentCacheKey(collection, id);

        this.documentCache.del(documentCacheKey);

        if (this.index) {
            this.index[collection] = null;
        }
    }

    private getDocumentPath(collection: string, id: string) {
        return path.join(this.dir, collection, `${id}.${DOC_FILE_EXT}`);
    }

    private getDocumentCacheKey(collection: string, id: string) {
        return `${collection}-${id}`;
    }
}

interface IndexDocument {
    id: string;
    path: string;
}