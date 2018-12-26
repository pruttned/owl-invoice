export interface Client {
    id: string;
    name: string;
    address: string;
    taxId?: string; //DIC
    businessId?: string; //ICO
    vatNumber?: string; //IC DPH
    color: string;
    initials: string;
}