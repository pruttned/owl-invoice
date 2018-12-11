const { default: jestFs, mock: fs } = require('jest-plugin-fs');
import { DocumentFsReader } from './document-fs-reader';
import { documentFsListener, IOnChangeArgs, IDocumentFsWatcher } from './document-fs-watcher';

jest.mock('fs', () => require('jest-plugin-fs/mock'));

class DocumentFsWatcherMock implements IDocumentFsWatcher {
    private listeners: documentFsListener[] = [];
    onChange(args: IOnChangeArgs) {
        this.listeners.forEach(l => l(args));
    }
    addListener(listener: documentFsListener) {
        this.listeners.push(listener);
    }
    removeListener(listener: documentFsListener) {
    }
    close() {
    }
}


describe('DocumentFsReader', () => {
    let documentFsWatcherMock: DocumentFsWatcherMock;
    let documentFsReader: DocumentFsReader;

    beforeEach(() => {
        documentFsWatcherMock = new DocumentFsWatcherMock();
        documentFsReader = new DocumentFsReader('c:/db', documentFsWatcherMock);
        jestFs.mock({
            'db': {
                'col1': {
                    'c1f1.yaml': 'title: c1f1',
                    'c1f2.yaml': 'title: c1f2',
                },
                'col2': {
                    'c2f1.yaml': 'title: c2f1',
                    'c2f2.yaml': 'title: c2f2',
                }
            }
        }, 'c:/');
    });

    afterEach(() => jestFs.restore());

    describe('getCollection', () => {
        test('retrieve all documents from a collection', async () => {
            expect(await documentFsReader.getCollection('col1')).toEqual(['c1f1', 'c1f2']);
        });
        test('cache index of read collection', async () => {
            await documentFsReader.getCollection('col1');
            fs.writeFileSync('c:/db/col1/c1xx.yaml', 'title: c1xx'); //should not change col1, because there was no refresh from watcher
            fs.writeFileSync('c:/db/col2/c2xx.yaml', 'title: c2xx'); //this should update, because the collection was not indexed yet
            expect(await documentFsReader.getCollection('col1')).toEqual(['c1f1', 'c1f2']);
            expect(await documentFsReader.getCollection('col2')).toEqual(['c2f1', 'c2f2', 'c2xx']);
        });
        test('update index cache after fs change', async () => {
            await documentFsReader.getCollection('col1');
            fs.writeFileSync('c:/db/col1/c1xx.yaml', 'title: c1xx');
            expect(await documentFsReader.getCollection('col1')).toEqual(['c1f1', 'c1f2']);
            documentFsWatcherMock.onChange({ file: 'c:/col1/c1xx.yaml' });
            expect(await documentFsReader.getCollection('col1')).toEqual(['c1f1', 'c1f2', 'c1xx']);
        });
    });

    describe('getDocument', () => {
        test('retrieve specified document', async () => {
            expect(await documentFsReader.getDocument('col1', 'c1f1')).toEqual({ title: 'c1f1' });
        });
        test('cache retrieved document', async () => {
            await documentFsReader.getDocument('col1', 'c1f1');
            fs.writeFileSync('c:/db/col1/c1f1.yaml', 'title: c1f1X'); //should not change document, because there was no refresh from watcher
            fs.writeFileSync('c:/db/col1/c1f2.yaml', 'title: c1f2X'); //this should update, because the document was not retrieved yet
            expect(await documentFsReader.getDocument('col1', 'c1f1')).toEqual({ title: 'c1f1' });
            expect(await documentFsReader.getDocument('col1', 'c1f2')).toEqual({ title: 'c1f2X' });
        });
        test('reload document after fs change', async () => {
            await documentFsReader.getDocument('col1', 'c1f1');
            await documentFsReader.getDocument('col1', 'c1f2');
            fs.writeFileSync('c:/db/col1/c1f1.yaml', 'title: c1f1X'); 
            fs.writeFileSync('c:/db/col1/c1f2.yaml', 'title: c1f2X'); // this should not be updated, because there were no onChange for this file
            documentFsWatcherMock.onChange({ file: 'c:/col1/c1f1.yaml' });
            expect(await documentFsReader.getDocument('col1', 'c1f1')).toEqual({ title: 'c1f1X' });
            expect(await documentFsReader.getDocument('col1', 'c1f2')).toEqual({ title: 'c1f2' });
        });
    })
})
