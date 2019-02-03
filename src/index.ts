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

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';
const DIR = process.env.DIR || '.\\example\\db1';

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

// app.get('*', function (req: any, res: Response) {
//     //res.send('asdasd');
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.post('/generateInvoicePdf', async function (req: Request, res: Response) {
    let pdfPath = await invoicePdfGenerator.generate(req.body.invoiceId, req.body.templateDefinitionId);
    res.send(pdfPath);
    //res.send('asdasd');
    // res.sendFile(path.join(__dirname, '../public/index.html'));
});

// app.use('/generated', express.static(path.join(__dirname, '../generated')));

app.listen(PORT, () => {
    console.log(`Go to http://${HOST}:${PORT}${server.graphqlPath} to run queries!`)
})