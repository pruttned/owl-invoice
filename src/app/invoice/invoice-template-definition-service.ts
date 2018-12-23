import { Language } from "../resources";

class InvoiceTemplateDefinitionService {
    private definitions: { [id: string]: InvoiceTemplateDefinition } = {
        defaultSK: {
            templateName: 'default',
            templateParams: {
                language: Language.SK
            },
            displayName: 'SK'
        },
        defaultAT: {
            templateName: 'default',
            templateParams: {
                language: Language.AT
            },
            displayName: 'AT'
        }
    };

    getAllForList(): { id: string, displayName: string }[] {
        return Object.keys(this.definitions).map(id => ({
            id,
            displayName: this.definitions[id].displayName
        }));
    }

    getById(id: string): InvoiceTemplateDefinition {
        return this.definitions[id];
    }
}

export interface InvoiceTemplateDefinition {
    templateName: string;
    templateParams: any;
    displayName: string;
}

export const invoiceTemplateDefinitionService = new InvoiceTemplateDefinitionService();