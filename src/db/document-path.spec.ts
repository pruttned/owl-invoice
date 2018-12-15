import { getCollectionFromPath, getIdFromPath } from './document-path';

describe('DocumentPath', () => {

    describe('getCollectionFromPath', () => {
        test('get collection from path', async () => {
            expect(getCollectionFromPath('c:/x/y/z/col/file.yaml')).toEqual('col');
            expect(getCollectionFromPath('./z/col/file.yaml')).toEqual('col');
        });
        test('get id from path', async () => {
            expect(getIdFromPath('c:/x/y/z/col/file.yaml')).toEqual('file');
            expect(getIdFromPath('./z/col/file.yaml')).toEqual('file');
        });
    });
})
