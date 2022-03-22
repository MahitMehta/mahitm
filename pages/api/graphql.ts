import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer, gql } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const DEBUG = process.env.NODE_ENV === "development"; 

const typeDefs = gql`
    type User {
        id: ID
    }

    type Query {
        getUser: User
    }
`;

const resolvers = {
  Query: {
    getUser: () => {
        console.log('hello')
        return {
            id: "Foo",
        };
    },
  },
};

interface Data {};

const plugins = [];

if (DEBUG) {
    plugins.push(ApolloServerPluginLandingPageGraphQLPlayground());
}

const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    debug: DEBUG,
    plugins,
});
const startServer = apolloServer.start();
const graphqlPath = '/api/graphql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    await startServer;
    await apolloServer.createHandler({ path: graphqlPath })(req, res);
}

export const config = {
    api: {
      bodyParser: false,
    },
};