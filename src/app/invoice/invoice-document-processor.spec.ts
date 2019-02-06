import { InvoiceDocumentProcessor } from './invoice-document-processor';
import { InvoiceDocument } from './invoice-document';
import Decimal from 'decimal.js';

describe('InvoiceDocumentProcessor', () => {

    let processor: InvoiceDocumentProcessor;

    beforeEach(() => {
        processor = new InvoiceDocumentProcessor();
    });

    describe('toDb', () => {
        test('correctly transforms the document', () => {
            let document: InvoiceDocument = {
                id: '0',
                client: '1',
                dueDate: new Date(),
                issueDate: new Date(),
                deliveryDate: new Date(),
                items: [
                    {
                        text: 'someItem',
                        unitCount: new Decimal(1),
                        unitPrice: new Decimal(2)
                    }
                ]
            };
            expect(processor.toDb(document)).toEqual({
                ...document,
                items: document.items.map(item => ({
                    ...item,
                    unitCount: '1',
                    unitPrice: '2'
                }))
            });
        });
    });
})


