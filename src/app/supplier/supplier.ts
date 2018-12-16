interface Supplier {
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
}

export const supplier: Supplier = { //TODO
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
}