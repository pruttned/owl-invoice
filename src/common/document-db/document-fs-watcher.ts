import { DOC_FILE_GLOB } from './document-path';
import chokidar from 'chokidar';
import path from 'path';
import { remove } from 'lodash';

export interface IDocumentFsWatcher {
    addListener: (listener: documentFsListener) => void;
    removeListener: (listener: documentFsListener) => void;
    close: () => void;
}

export class DocumentFsWatcher implements IDocumentFsWatcher {
    private watcher: chokidar.FSWatcher | null;
    private listeners: documentFsListener[] = [];

    constructor(dir: string) {
        //https://github.com/paulmillr/chokidar/issues/645
        this.watcher = chokidar.watch(`**/${DOC_FILE_GLOB}`, { cwd: dir });
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