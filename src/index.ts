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

['PORT', 'HOST', 'DIR'].forEach(v => {
    if (!process.env[v]) {
        throw new Error(`Missing ${v} env variable`);
    }
});

const PORT = process.env.PORT!;
const HOST = process.env.HOST!;
const DIR = process.env.DIR!;

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

app.get('/api/invoices/export', async function (req: Request, res: Response, next) {
    try {
        let pdfPath = await invoicePdfGenerator.generate(req.query.invoiceId, req.query.templateDefinitionId);
        res.sendFile(path.resolve(pdfPath));
    } catch (err) {
        next(err);
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`)
})