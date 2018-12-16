class ResourcesOfLanguage {

    invoice = { SK: 'faktúra', AT: 'Rechnung' }[this.language];
    issueDate = { SK: 'dátum vystavenia', AT: 'Rechnungsdatum' }[this.language];
    supplier = { SK: 'dodávateľ', AT: 'Lieferant' }[this.language];
    businessId = { SK: 'IČO', AT: 'IDN' }[this.language];
    vatNumber = { SK: 'IČ DPH', AT: 'UID NR' }[this.language];
    taxId = { SK: 'DIČ', AT: 'Steuernummer' }[this.language];
    client = { SK: 'klient', AT: 'Klient' }[this.language];
    invoiceItems = { SK: 'poskytnuté služby', AT: 'bereitgestellte Dienste' }[this.language];
    iban = { SK: 'IBAN', AT: 'IBAN' }[this.language];
    variableSymbol = { SK: 'variabilný symbol', AT: 'variable Symbol' }[this.language];
    dueDate = { SK: 'dátum splatnosti', AT: 'Fälligkeitsdatum' }[this.language];
    bank = { SK: 'banka', AT: 'Bank' }[this.language];
    sumPrice = { SK: 'suma', AT: 'gesamt' }[this.language];
    invoicePrice = { SK: 'celková suma na úhradu', AT: 'Rechnungsbetrag' }[this.language];

    constructor(private language: Language) {
    }
}

class Resources {
    resourcesByLanguage: any = {};

    public get(language: Language): ResourcesOfLanguage {
        this.resourcesByLanguage[language] = this.resourcesByLanguage[language] || new ResourcesOfLanguage(language);
        return this.resourcesByLanguage[language];
    }
}

export enum Language {
    SK = 'SK',
    AT = 'AT'
}

export const resources = new Resources();