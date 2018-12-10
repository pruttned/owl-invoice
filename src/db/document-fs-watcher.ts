import chokidar from 'chokidar';
import path from 'path';
import { remove } from 'lodash';

const docFileExt = 'yaml';
const docFileGlob = `*.${docFileExt}`;

export interface IDocumentFsWatcher {
    addListener: (listener: documentFsListener) => void;
    removeListener: (listener: documentFsListener) => void;
    close: () => void;
}

export class DocumentFsWatcher implements IDocumentFsWatcher {
    private watcher: chokidar.FSWatcher | null;
    private listeners: documentFsListener[] = [];

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
        remove<documentFsListener>(this.listeners, listener);
    }
    close() {
        if (this.watcher) {
            this.watcher.close();
            this.watcher = null;
        }
    }
    private onChange(args: IOnChangeArgs) {
        this.listeners.forEach(l => l(args));
    }
}

export interface IOnChangeArgs {
    file: string,
    //   type: 'add' | 'unlink' | 'change'
}

export type documentFsListener = (args: IOnChangeArgs) => void;