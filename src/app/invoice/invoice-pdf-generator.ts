import { pdfGenerator } from '../../common/pdf-generator';
import path from 'path';
import { resources } from '../resources';
import { htmlHelper } from '../../common/htmlHelper';
import { InvoiceDocument, InvoiceItem } from './invoice-document';
import Decimal from 'decimal.js';
import { ClientDocument } from '../client/client-document';
import { supplierService } from '../supplier/supplier-service';
import { SupplierDocument } from '../supplier/supplier-document';
import { invoiceService } from './invoice-service';
import { clientService } from '../client/client-service';
import { invoiceTemplateDefinitionService } from './invoice-template-definition-service';
import { DIR } from '../../config';
import Handlebars from 'handlebars';
import moment from 'moment';

class InvoicePdfGenerator {
    private outDir = path.join(DIR, 'generated');
    private templatesDir = path.join(__dirname, '../../../content/templates');

    public async generate(invoiceId: string, templateDefinitionId: string): Promise<string> {
        let templateDefinition = invoiceTemplateDefinitionService.getById(templateDefinitionId);

        let invoiceModel = await this.getInvoice(invoiceId);
        this.processItemTemplates(invoiceModel, templateDefinition.templateParams.language);
        let viewModel = {
            invoice: invoiceModel,
            supplier: await this.getSupplier(),
            resources: resources.get(templateDefinition.templateParams.language),
            html: htmlHelper,
            getTemplateResourcePath: (relativePath: string) => `file:///${path.resolve(path.join(this.templatesDir, 'invoice', templateDefinition.templateName, relativePath))}`,
        };

        let templatePath = path.join('invoice', templateDefinition.templateName, 'template.html');
        let pdfPath = path.join(this.outDir, `${this.getInvoicePdfName(viewModel.invoice)}.pdf`);

        await pdfGenerator.generate(templatePath, viewModel, pdfPath);
        return pdfPath;
    }

    private processItemTemplates(invoice: InvoiceViewModel, language: string): any {
        const helpers = {
            helpers: {
                date: (date: Date, format: string) => new Handlebars.SafeString(moment(date).locale(language).format(format))
            }
        };
        invoice.items.forEach(item => item.text = Handlebars.compile(item.text)({ ...invoice, item }, helpers));
    }

    private getInvoicePdfName(invoice: InvoiceViewModel): string {
        return invoice.number;
    }

    private async getInvoice(number: string): Promise<InvoiceViewModel> {
        let invoice = await invoiceService.getById(number);
        let client = await clientService.getById(invoice.client);
        return new InvoiceViewModel(invoice, client);
    }

    private async getSupplier(): Promise<SupplierViewModel> {
        let supplier = await supplierService.get();
        if (!supplier) throw new Error('no supplier');
        return new SupplierViewModel(supplier);
    }
}

class InvoiceViewModel {
    number: string;
    variableSymbol: string;
    issueDate: Date;
    deliveryDate: Date;
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
        this.deliveryDate = invoiceDocument.deliveryDate;
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
    vatNumber?: string; //IC DPH    

    constructor(document: ClientDocument) {
        this.name = document.name;
        this.address = document.address;
        this.taxId = document.taxId;
        this.businessId = document.businessId;
        this.vatNumber = document.vatNumber;
    }
}

class SupplierViewModel {
    name: string;
    address: string;
    taxId: string; //DIC
    businessId: string; //ICO
    vatNumber: string; //IC DPH
    register: string;
    iban: string;
    bank: string;
    phoneNumber: string;
    email: string;

    constructor(document: SupplierDocument) {
        this.name = document.name;
        this.address = document.address;
        this.taxId = document.taxId;
        this.businessId = document.businessId;
        this.vatNumber = document.vatNumber;
        this.register = document.register;
        this.iban = document.iban;
        this.bank = document.bank;
        this.phoneNumber = document.phoneNumber;
        this.email = document.email;
    }
}

export const invoicePdfGenerator = new InvoicePdfGenerator();






// db.init('example/db1');
// invoicePdfGenerator.generate('201701', 'defaultSK').then(pdfPath => {
//     console.log('DONE', pdfPath);
// }).catch(console.error);
