import { DocumentCollection } from './document-collection';
import { IDocumentFs } from './document-fs';
import { includes } from 'lodash';

describe('DocumentCollection', () => {

    const DocumentFsMock = jest.fn<IDocumentFs>(() => ({
        getCollection: jest.fn(() => Promise.resolve(['ab', 'abc', 'abcd', 'abcde'])),
        getDocument: jest.fn((_, doc) => Promise.resolve({
            tags: [doc]
        }))
    }));

    interface IDoc {
        id: string;
        tags: string[];
    }

    let documentFsMock: IDocumentFs;
    let documentCollection: DocumentCollection<IDoc>;

    beforeEach(() => {
        documentFsMock = new DocumentFsMock();
        documentCollection = new DocumentCollection('col1', documentFsMock);
    });

    describe('getAll', () => {
        test('call documentFsMock getCollection', async () => {
            await documentCollection.getAll();
            expect(documentFsMock.getCollection).toHaveBeenCalledWith('col1');
        });
        describe('without query', () => {
            test('load all documents in collection', async () => {
                await documentCollection.getAll();
                expect(documentFsMock.getDocument).toBeCalledTimes(4);
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'ab');
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abc');
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abcd');
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abcde');
            });
        });
        describe('by id query', () => {
            test('load only matched documents', async () => {
                await documentCollection.getAll({ id: 'abcd*' });
                expect(documentFsMock.getDocument).toBeCalledTimes(2);
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abcd');
                expect(documentFsMock.getDocument).toHaveBeenCalledWith('col1', 'abcde');
            });
        });
        describe('by sift query', () => {
            test('get matched documents', async () => {
                let res = await documentCollection.getAll({
                    where: {
                        tags: { $in: ['abc'] }
                    }
                });
                expect(res).toEqual([{ tags: ['abc'] }]);
            });
        });
        describe('by function query', () => {
            test('get matched documents', async () => {
                let res = await documentCollection.getAll({
                    where: (item: IDoc) => includes(item.tags, 'ab')
                });
                expect(res).toEqual([{ tags: ['ab'] }]);
            });
        });
    });

    describe('singleOrDefault', () => {
        test('get document by id', async () => {
            expect(await documentCollection.singleOrDefault('ab')).toEqual({ tags: ['ab'] });
        });
        test('get undefined for nonexisting id', async () => {
            expect(await documentCollection.singleOrDefault('abxcxc')).toBeUndefined();
        });
    });

    describe('single', () => {
        test('get document by id', async () => {
            expect(await documentCollection.single('ab')).toEqual({ tags: ['ab'] });
        });
        test('throw for nonexisting id', async () => {
            await expect(documentCollection.single('abxcxc')).rejects.toThrow(/not found/i);
        });
    });
})


