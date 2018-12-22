import { pdfGenerator } from '../../common/pdf-generator';
import path from 'path';
import { Language, resources } from '../resources';
import { htmlHelper } from '../../common/htmlHelper';
import { db } from '../db';
import { InvoiceDocument, InvoiceItem } from './invoice-document';
import Decimal from 'decimal.js';
import { ClientDocument } from '../client/client-document';

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
            invoice: await this.getInvoice(invoiceNumber),
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

    private async getInvoice(number: string): Promise<InvoiceViewModel> {
        let invoice = await db.invoices.single(number);
        let client = await db.clients.single(invoice.client);
        return new InvoiceViewModel(invoice, client);
    }
}

class InvoiceViewModel {
    number: string;
    variableSymbol: string;
    issueDate: Date;
    dueDate: Date;
    client: ClientViewModel;
    items: InvoiceItemViewModel[];

    get sumPrice(): Decimal {
        return this.items.reduce((sum, item) => sum.add(item.sumPrice), new Decimal(0));
    }

    constructor(invoiceDocument: InvoiceDocument, clientDocument: ClientDocument) {
        this.number = invoiceDocument.id;
        this.variableSymbol = invoiceDocument.id;
        this.issueDate = invoiceDocument.issueDate;
        this.dueDate = invoiceDocument.dueDate;
        this.client = new ClientViewModel(clientDocument);
        this.items = invoiceDocument.items ? invoiceDocument.items.map(item => new InvoiceItemViewModel(item)) : []
    }
}

class InvoiceItemViewModel {
    text: string;
    unitCount: Decimal;
    unitPrice: Decimal;

    get sumPrice(): Decimal {
        return this.unitPrice.mul(this.unitCount);
    }

    constructor(item: InvoiceItem) {
        this.text = item.text;
        this.unitCount = item.unitCount;
        this.unitPrice = item.unitPrice;
    }
}

class ClientViewModel {
    name: string;
    address: string;
    taxId: string; //DIC
    businessId: string; //ICO
    vatNumber: string; //IC DPH    

    constructor(document: ClientDocument) {
        this.name = document.name;
        this.address = document.address;
        this.taxId = document.taxId;
        this.businessId = document.businessId;
        this.vatNumber = document.vatNumber;
    }
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
