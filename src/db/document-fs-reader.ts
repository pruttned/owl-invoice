import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import globP from 'glob';
import { promisify } from 'util';
import yaml from 'js-yaml';

const glob = promisify(globP);
const readFile = promisify(fs.readFile);

const docFileExt = 'yaml';
const docFileGlob = `*.{docFileExt}`;

export class DocumentFsReader {
    watcher: chokidar.FSWatcher | null;
    index: { [id: string]: IndexDocument[] | null } = {};

    constructor(private dir: string) {
        this.watcher = chokidar.watch(path.join(dir, `**/${docFileGlob}`));
        this.watcher
            .on('add', p => this.onChange(p))
            .on('unlink', p => this.onChange(p))
            .on('change', p => this.onChange(p));
    }
    close() {
        if (this.watcher) {
            this.watcher.close();
            this.watcher = null;
        }
    }

    onChange(file: string) {
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