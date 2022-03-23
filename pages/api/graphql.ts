import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer, gql } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { GraphQLUpload, graphqlUploadExpress, processRequest } from "graphql-upload"

const DEBUG = process.env.NODE_ENV === "development"; 

const typeDefs = gql`
    scalar Upload

    input IContactFormDTO {
        fullName: String!
        email: String!
        message: String!
    }

    type Query {
      getRoot: String! 
    }

    type Mutation {
        sendContactForm(files: [ Upload! ], input: IContactFormDTO!): Boolean!
    }
`;

interface IContactFormDTO {
  files: File[],
  input: {
    fullName: string; 
    email: string; 
    message: string; 
  }
}

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getRoot: () => {
      return "GraphQL Server Live!";
    }
  },
  Mutation: {
    sendContactForm: async (_:any, data:IContactFormDTO) => {
        console.log(data.files, data.input);
        return true; 
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
    await startServer

    const contentType = req.headers["content-type"]
    if (contentType && contentType.startsWith("multipart/form-data")) {
      //  console.log("requested with file", req.body, (req as any).raw);
      // (req as any).filePayload = await processRequest(req, res)
     // console.log((req as any).filePayload, 'hello');
    }

    return await apolloServer.createHandler({ path: graphqlPath })(req, res)
}

export const config = {
    api: {
      bodyParser: false
    },
};