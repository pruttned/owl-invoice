import { DbMock } from './../__mocks__/db';
import { db } from '../db';
import { invoiceService } from './invoice-service';

jest.mock('../db');

const dbMock = db as any as DbMock;

describe('InvoiceService', () => {
    describe('getNextNumberInYear', () => {
        test('return next number in year', async () => {
            //    dbMock.invoiceGetAllIdsResult = ['2001002', '2001001'];
            (dbMock.invoicesDocumentFs.getCollection as any).mockImplementationOnce(() => Promise.resolve(['2001001', '2001002', '2099003']))
            expect(await invoiceService.getNextNumberInYear(2001)).toEqual('2001003');
        });

        test('return one for empty year', async () => {
            (dbMock.invoicesDocumentFs.getCollection as any).mockImplementationOnce(() => Promise.resolve(['2001001', '2001002', '2099003']))
            expect(await invoiceService.getNextNumberInYear(9999)).toEqual('9999001');
        });
    });
});
