import path from 'path';
import fs from 'fs';
import globP from 'glob';
import { promisify } from 'util';
import yaml from 'js-yaml';
import { IDocumentFsWatcher, IOnChangeArgs } from './document-fs-watcher';
import NodeCache from 'node-cache';
import { DOC_FILE_GLOB, DOC_FILE_EXT, getCollectionFromPath, getIdFromPath } from './document-path';
import { Document } from './document';
import { omit } from 'lodash';
import mkdirpP from 'mkdirp';

const glob = promisify(globP);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const mkdirp = promisify(mkdirpP);

export interface IDocumentFs { //TODO: remove interface
    close(): void;
    getDocument(collection: string, id: string): Promise<any>;
    getCollection(collection: string): Promise<string[]>;
    writeDocument(collection: string, document: Document, options?: WriteDocumentOptions): Promise<any>;
    removeDocument(collection: string, id: string): Promise<boolean>;
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
            document = yaml.safeLoad(fileContent) || {};
            (document as any)['id'] = id;

            this.documentCache.set(documentCacheKey, document);
        }
        return document;
    }

    async writeDocument(collection: string, document: Document, options?: WriteDocumentOptions): Promise<any> {
        if (!document.id) {
            throw new Error('missing id');
        }

        const file = this.getDocumentPath(collection, document.id);
        if (options && options.noOverride) {
            if (fs.existsSync(file)) {
                throw new Error(`document '${document.id}' already exists in collection '${collection}'`);
            }
        }

        this.invalidateDocumentInCache(collection, document.id);
        const fileContent = yaml.safeDump(this.excludeInternalProperties(document));
        
        await mkdirp(path.dirname(file));
        await writeFile(file, fileContent, 'utf-8');
        
        return document;
    }

    async removeDocument(collection: string, id: string): Promise<boolean> {
        if (!id) {
            throw new Error('missing id');
        }

        const file = this.getDocumentPath(collection, id);
        try {
            await unlink(file);
            this.invalidateDocumentInCache(collection, id);
            return true;
        } catch (err) {
            console.log('err.code', err.code);
            if (err.code !== 'ENOENT') {
                throw err;
            }
            return false;
        }
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
        this.invalidateDocumentInCache(collection, id);
    }

    private invalidateDocumentInCache(collection: string, id: string) {
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

    private excludeInternalProperties(document: any): any {
        return omit(document, 'id');
    }
}

interface IndexDocument {
    id: string;
    path: string;
}

export interface WriteDocumentOptions {
    noOverride?: boolean;
}