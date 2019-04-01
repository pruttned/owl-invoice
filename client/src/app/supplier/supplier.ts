export interface Supplier {
    id: string;
    name: string;
    address: string;
    taxId: string; //DIC
    businessId: string; //ICO
    vatNumber?: string; //IC DPH
    register: string;
    iban: string;
    bank: string;
    phoneNumber?: string;
    email?: string;
}