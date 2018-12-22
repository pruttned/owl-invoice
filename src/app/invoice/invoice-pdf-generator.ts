import { pdfGenerator } from '../../common/pdf-generator';
import path from 'path';
import { Language, resources } from '../resources';
import { htmlHelper } from '../../common/htmlHelper';
import { db } from '../db';
import { InvoiceDocument } from './invoice-document';

class InvoicePdfGenerator {
    private outDir = 'generated';

    public async generate(invoiceNumber: string, templateDefinition: InvoiceTemplateDefinition): Promise<string> {
        let supplier = { //TODO: from service
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
            invoice : this.createInvoiceViewModel(await db.invoices.single(invoiceNumber)),
            supplier,
            resources: resources.get(templateDefinition.templateParams.language),
            html: htmlHelper,
            getItemSumPrice: this.getItemSumPrice,
            getSumPrice: this.getSumPrice,
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

    private getSumPrice(invoice: InvoiceViewModel): number {
        return invoice.items.reduce((sum, item) => sum + this.getItemSumPrice(item), 0);
    }

    private getItemSumPrice(invoiceItem: InvoiceItemViewModel): number {
        return invoiceItem.unitPrice * invoiceItem.unitCount;
    }

    private createInvoiceViewModel(document: InvoiceDocument) : InvoiceViewModel{
        //TODO

        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 10);

        return {
            client: {
                name: 'Super mega firma',
                address: 'Super ulica 25\n85104 Bratislava',
                businessId: '12345678',
                taxId: '1234567890',
                vatNumber: 'SK1234567890'
            },
            dueDate: dueDate,
            issueDate: new Date(),
            number: '2018005',
            variableSymbol: '2018005',
            items: [
                { text: 'Prace za mesiac jun 2018', unitCount: 1, unitPrice: 10 },
                { text: 'Nieco ine', unitCount: 2, unitPrice: 20 },
                { text: 'Este daco', unitCount: 1, unitPrice: 10 }
            ]
        };
    }
}

export interface InvoiceViewModel {
    number: string;
    variableSymbol: string;
    issueDate: Date;
    dueDate: Date;

    client: ClientViewModel;
    items: InvoiceItemViewModel[];
}

interface InvoiceItemViewModel {
    text: string;
    unitCount: number;
    unitPrice: number;
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






db.init('example/db1');
invoicePdfGenerator.generate('201701', InvoiceTemplateDefinitions.defaultSK).then(pdfPath => {
    console.log('DONE', pdfPath);
}).catch(console.error);
