import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import globP from 'glob';
import { promisify } from 'util';
import yaml from 'js-yaml';
import { remove } from 'lodash';

const glob = promisify(globP);
const readFile = promisify(fs.readFile);

const docFileExt = 'yaml';
const docFileGlob = `*.{docFileExt}`;

export class DocumentFsWatcher {
    watcher: chokidar.FSWatcher | null;
    listeners: documentFsListener[] = [];

    constructor(dir: string) {
        this.watcher = chokidar.watch(path.join(dir, `**/${docFileGlob}`));
        this.watcher
            .on('add', file => this.onChange({ file }))
            .on('unlink', file => this.onChange({ file }))
            .on('change', file => this.onChange({ file }));
    }
    addListener(listener: documentFsListener) {
        this.listeners.push(listener);
    }
    removeListener(listener: documentFsListener) {
        remove(this.listeners, listener);
    }
    close() {
        if (this.watcher) {
            this.watcher.close();
            this.watcher = null;
        }
    }
    onChange(args: IOnChangeArgs) {
        this.listeners.forEach(l => l(args));
    }
}

export interface IOnChangeArgs {
    file: string,
    //   type: 'add' | 'unlink' | 'change'
}

export type documentFsListener = (args: IOnChangeArgs) => void;