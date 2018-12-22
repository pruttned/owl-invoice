import { pdfGenerator } from '../../common/pdf-generator';
import path from 'path';
import { Language, resources } from '../resources';
import { htmlHelper } from '../../common/htmlHelper';

class InvoicePdfGenerator {
    private outDir = 'generated';

    public async generate(invoice: Invoice, templateDefinition: InvoiceTemplateDefinition): Promise<string> {
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
            invoice,
            supplier,
            resources: resources.get(templateDefinition.templateParams.language),
            html: htmlHelper,
            getItemSumPrice: this.getItemSumPrice,
            getSumPrice: this.getSumPrice,
            getTemplateResourcePath: (relativePath: string) => `file:///${path.resolve(path.join('templates', 'invoice', templateDefinition.templateName, relativePath))}`,
        };

        let templatePath = path.join('invoice', templateDefinition.templateName, 'template.html');
        let pdfPath = path.join(this.outDir, `${this.getInvoicePdfName(invoice)}.pdf`);

        await pdfGenerator.generate(templatePath, viewModel, pdfPath);
        return pdfPath;
    }

    private getInvoicePdfName(invoice: Invoice): string {
        return invoice.number;
    }

    private getSumPrice(invoice: Invoice): number {
        return invoice.items.reduce((sum, item) => sum + this.getItemSumPrice(item), 0);
    }

    private getItemSumPrice(invoiceItem: InvoiceItem): number {
        return invoiceItem.unitPrice * invoiceItem.unitCount;
    }
}

export interface Invoice {
    number: string;
    variableSymbol: string;
    issueDate: Date;
    dueDate: Date;

    client: Client;
    items: InvoiceItem[];
}

interface InvoiceItem {
    text: string;
    unitCount: number;
    unitPrice: number;
}

interface Client {
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






let dueDate = new Date();
dueDate.setDate(dueDate.getDate() + 10);
let invoice: Invoice = {
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
invoicePdfGenerator.generate(invoice, InvoiceTemplateDefinitions.defaultSK).then(pdfPath => {
    console.log('DONE', pdfPath);
}).catch(console.error);