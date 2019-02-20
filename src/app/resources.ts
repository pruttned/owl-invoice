class ResourcesOfLanguage {

    invoice = { SK: 'faktúra', 'de-AT': 'Rechnung' }[this.language];
    issueDate = { SK: 'dátum vystavenia', 'de-AT': 'Rechnungsdatum' }[this.language];
    deliveryDate = { SK: 'dátum dodania', 'de-AT': 'Lieferdatum' }[this.language];
    supplier = { SK: 'dodávateľ', 'de-AT': 'Lieferant' }[this.language];
    businessId = { SK: 'IČO', 'de-AT': 'IDN' }[this.language];
    vatNumber = { SK: 'IČ DPH', 'de-AT': 'UID NR' }[this.language];
    taxId = { SK: 'DIČ', 'de-AT': 'Steuernummer' }[this.language];
    client = { SK: 'klient', 'de-AT': 'Klient' }[this.language];
    invoiceItems = { SK: 'poskytnuté služby', 'de-AT': 'bereitgestellte Dienste' }[this.language];
    iban = { SK: 'IBAN', 'de-AT': 'IBAN' }[this.language];
    variableSymbol = { SK: 'variabilný symbol', 'de-AT': 'variable Symbol' }[this.language];
    dueDate = { SK: 'dátum splatnosti', 'de-AT': 'Fälligkeitsdatum' }[this.language];
    bank = { SK: 'banka', 'de-AT': 'Bank' }[this.language];
    sumPrice = { SK: 'suma', 'de-AT': 'gesamt' }[this.language];
    invoicePrice = { SK: 'celková suma na úhradu', 'de-AT': 'Rechnungsbetrag' }[this.language];

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
    AT = 'de-AT'
}

export const resources = new Resources();