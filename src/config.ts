import rc from 'rc';

const rcCfg = rc('owlinvoice');

['DIR'].forEach(v => {
    if (!process.env[v] && !rcCfg[v]) {
        throw new Error(`Argument ${v} is missing. Specify it in .owlinvoicerc file or in ENV`);
    }
});

export const PORT = process.env.PORT || rcCfg.PORT || 3001;
export const HOST = process.env.HOST || rcCfg.HOST || 'localhost';
export const DIR = process.env.DIR || rcCfg.DIR;



