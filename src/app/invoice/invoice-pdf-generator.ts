import { pdfGenerator } from '../../common/pdf-generator';
import path from 'path';
import { Language, resources } from '../resources';
import { htmlHelper } from '../../common/htmlHelper';
import { db } from '../db';
import { InvoiceDocument } from './invoice-document';
import Decimal from 'decimal.js';

class InvoicePdfGenerator {
    private outDir = 'generated';

    public async generate(invoiceNumber: string, templateDefinition: InvoiceTemplateDefinition): Promise<string> {
        let supplierViewModel = { //TODO: from service
            name: 'Janko Hrasko',
            address: 'Mrkvova 4\n85104 Bratislava',
            taxId: '123456',
            businessId: '12345678',
            vatNumber: 'SK12345678',
            register: 'zivnostensky register 110-259059',
            iban: 'SK77 0900 0000 0051 0826 7519',
            bank: 'Slovenská sporiteľna, as (GIBASKBX)',
            phoneNumber: '0904 221 445',
            email: 'hrasko@gmail.com'
        };

        let viewModel = {
            invoice: this.createInvoiceViewModel(await db.invoices.single(invoiceNumber)),
            supplier: supplierViewModel,
            resources: resources.get(templateDefinition.templateParams.language),
            html: htmlHelper,
            getTemplateResourcePath: (relativePath: string) => `file:///${path.resolve(path.join('templates', 'invoice', templateDefinition.templateName, relativePath))}`,
        };

        let templatePath = path.join('invoice', templateDefinition.templateName, 'template.html');
        let pdfPath = path.join(this.outDir, `${this.getInvoicePdfName(viewModel.invoice)}.pdf`);

        await pdfGenerator.generate(templatePath, viewModel, pdfPath);
        return pdfPath;
    }

    private getInvoicePdfName(invoice: InvoiceViewModel): string {
        return invoice.number;
    }

    private createInvoiceViewModel(document: InvoiceDocument): InvoiceViewModel {
        //TODO

        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 10);
        return new InvoiceViewModel(
            '2018005',
            '2018005',
            new Date(),
            dueDate,
            {
                name: 'Super mega firma',
                address: 'Super ulica 25\n85104 Bratislava',
                businessId: '12345678',
                taxId: '1234567890',
                vatNumber: 'SK1234567890'
            },
            [
                new InvoiceItemViewModel('Prace za mesiac jun 2018', new Decimal(1), new Decimal(10)),
                new InvoiceItemViewModel('Prace za mesiac jun 2018', new Decimal(2), new Decimal(20)),
                new InvoiceItemViewModel('Prace za mesiac jun 2018', new Decimal(1), new Decimal(10))
            ]
        );
    }
}

class InvoiceViewModel {
    constructor(
        public number: string,
        public variableSymbol: string,
        public issueDate: Date,
        public dueDate: Date,
        public client: ClientViewModel,
        public items: InvoiceItemViewModel[]
    ) { }

    get sumPrice(): Decimal {
        return this.items.reduce((sum, item) => sum.add(item.sumPrice), new Decimal(0));
    }
}

class InvoiceItemViewModel {
    constructor(
        public text: string,
        public unitCount: Decimal,
        public unitPrice: Decimal
    ) { }

    get sumPrice(): Decimal {
        return this.unitPrice.mul(this.unitCount);
    }
}

interface ClientViewModel {
    name: string;
    address: string;
    taxId: string; //DIC
    businessId: string; //ICO
    vatNumber: string; //IC DPH    
}

// interface Supplier {
//     name: string;
//     address: string;
//     taxId: string; //DIC
//     businessId: string; //ICO
//     vatNumber: string; //IC DPH
//     register: string;
//     iban: string;
//     bank: string;
//     phoneNumber: string;
//     email: string;
// }

interface InvoiceTemplateDefinition {
    templateName: string;
    templateParams: InvoiceTemplateParams;
    displayName: string;
}

interface InvoiceTemplateParams {
    language: Language;
}

export class InvoiceTemplateDefinitions {
    public static defaultSK: InvoiceTemplateDefinition = {
        templateName: 'default',
        templateParams: {
            language: Language.SK
        },
        displayName: 'SK'
    };

    public static defaultAT: InvoiceTemplateDefinition = {
        templateName: 'default',
        templateParams: {
            language: Language.AT
        },
        displayName: 'AT'
    };
}

export const invoicePdfGenerator = new InvoicePdfGenerator();






// db.init('example/db1');
// invoicePdfGenerator.generate('201701', InvoiceTemplateDefinitions.defaultSK).then(pdfPath => {
//     console.log('DONE', pdfPath);
// }).catch(console.error);
