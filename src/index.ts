import express, { Response } from 'express';
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

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const typeDefs = glob.sync(path.join(__dirname, '**/*.graphql'))
    .map(f => gql(fs.readFileSync(f, 'utf8')));

db.init('e:\\work\\git\\owl-invoice\\example\\db1');

const scalarResolver = {
    Date: GraphQLDate,
    Decimal: GraphQLDecimal
}
const app = express();
//https://www.apollographql.com/docs/apollo-server/essentials/data.html#context
const server = new ApolloServer({
    typeDefs,
    resolvers: merge(scalarResolver, clientResolver, invoiceResolver),
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

app.get('*', function (req: any, res: Response) {
    //res.send('asdasd');
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Go to http://${HOST}:${PORT}${server.graphqlPath} to run queries!`)
})