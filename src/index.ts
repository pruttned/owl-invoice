import express, { Response } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import DataLoader from 'dataloader';
import path from 'path';

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

//https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
const personTypeDef = gql`
  type Person 
  { 
      name: String!, 
      id: Int!, 
      posts(limit:Int): [Post] 
   }`;

const postTypeDef = gql`
   type Post{
       id: Int!,
       title:String!,
       person:Person
   }`;
const queryTypeDef = gql`
  type Query 
  { 
      persons: [Person],
      posts: [Post],
      person: Person
   }
`;

const resolvers = {
    Query: {
        persons: async (parent: any, args: any, ctx: any, resolveInfo: any) => {
            return await Promise.resolve([{ id: 1 }]);
        },
        posts: async (parent: any, args: any, ctx: any, resolveInfo: any) => {
            return await Promise.resolve([{ id: 2 }]);
        },
        person: async (parent: any, args: any, ctx: any, resolveInfo: any) => {
            return await Promise.resolve({ id: 2 });
        },
    },
    Person: {
        posts: async (person: any, args: any, ctx: any) => {
            // return ctx.loaders.postsByPersons.load({ idPerson: person.id, limit: args.limit });
            return ctx.loaders.postsByPersons.load(person.id);
            // return await database.table('posts').where('idPerson', person.id).limit(limit);
        }
    }
};

const app = express();
//https://www.apollographql.com/docs/apollo-server/essentials/data.html#context
const server = new ApolloServer({
    typeDefs: [personTypeDef, postTypeDef, queryTypeDef],
    resolvers,
    context: async () => ({
        someNumber: await Promise.resolve(123),
        loaders: {
            postsByPersons: new DataLoader(async (idPersons: any) => {
                //limit: https://github.com/facebook/dataloader/issues/78
                // var idPersons = { idPersons, limit }
                //console.log(limit);
                // var posts = await database.table('posts').whereIn('idPerson', idPersons);
                // return idPersons.map(idPerson => posts.filter(p => p.idPerson === idPerson));
                return [{ id: 2 }];
            })
        }
        //create loaders
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