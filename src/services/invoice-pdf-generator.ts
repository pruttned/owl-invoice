import { Stream } from 'stream';
import { Invoice } from '../models/invoice';
import { pdfGenerator } from './pdf-generator';
import path from 'path';
import { Language, resources } from './resources';
import { HtmlHelper } from './htmlHelper';
import { supplier } from '../models/supplier';

class InvoicePdfGenerator {
    public async generate(invoice: Invoice, templateDefinition: InvoiceTemplateDefinition): Promise<Stream> {
        let viewModel = {
            invoice,
            supplier,
            getTemplateResourcePath: (relativePath : string) => `file:///${path.resolve(path.join('templates', 'invoice', templateDefinition.templateName, relativePath))}`,
            resources: resources.get(templateDefinition.templateParams.language),
            helper: HtmlHelper
        };
        return await pdfGenerator.generate(path.join('invoice', templateDefinition.templateName, 'template.html'), viewModel);
    }
}

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
invoicePdfGenerator.generate(invoice, InvoiceTemplateDefinitions.defaultSK).then(stream => {
    console.log('DONE');
    // stream.pipe(fs.createWriteStream('out2.pdf'));
}).catch(console.error);