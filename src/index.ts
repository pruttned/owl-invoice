import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import path from 'path';
import fs from 'fs';
import { db } from './app/db';
import { merge } from 'lodash';
import { clientResolver } from './app/client/client-resolver';
import { invoiceResolver } from './app/invoice/invoice-resolver';
import glob from 'glob';
import { GraphQLDate } from 'graphql-iso-date';
import { GraphQLDecimal } from './common/graphql/decimal';
import { supplierResolver } from './app/supplier/supplier-resolver';
import { invoicePdfGenerator } from './app/invoice/invoice-pdf-generator';
import rc from 'rc';

const rcCfg = rc('owlinvoice');
console.log(rcCfg);

['DIR'].forEach(v => {
    if (!process.env[v] && !rcCfg[v]) {
        throw new Error(`Argument ${v} is missing. Specify it in .owlinvoicerc file or in ENV`);
    }
});

const PORT = process.env.PORT || rcCfg.PORT || 3001;
const HOST = process.env.HOST || rcCfg.HOST || 'localhost';
const DIR = process.env.DIR || rcCfg.DIR;

const typeDefs = glob.sync(path.join(__dirname, '**/*.graphql'))
    .map(f => gql(fs.readFileSync(f, 'utf8')));

db.init(DIR);

const scalarResolver = {
    Date: GraphQLDate,
    Decimal: GraphQLDecimal
}
const app = express();
//https://www.apollographql.com/docs/apollo-server/essentials/data.html#context
const server = new ApolloServer({
    typeDefs,
    resolvers: merge(
        scalarResolver,
        clientResolver,
        invoiceResolver,
        supplierResolver),
    context: async () => ({
        // someNumber: await Promise.resolve(123),
        // loaders: {
        //     postsByPersons: new DataLoader(async (idPersons: any) => {
        //         //limit: https://github.com/facebook/dataloader/issues/78
        //         // var idPersons = { idPersons, limit }
        //         //console.log(limit);
        //         // var posts = await database.table('posts').whereIn('idPerson', idPersons);
        //         // return idPersons.map(idPerson => posts.filter(p => p.idPerson === idPerson));
        //         return [{ id: 2 }];
        //     })
        // }
        // //create loaders
    })
});

server.applyMiddleware({ app, path: '/graphql' });
app.use(bodyParser.json());

app.post('/generateInvoicePdf', async function (req: Request, res: Response) {
    let pdfPath = await invoicePdfGenerator.generate(req.body.invoiceId, req.body.templateDefinitionId);
    res.send(pdfPath);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`)
})