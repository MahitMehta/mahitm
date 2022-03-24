import type { NextApiRequest, NextApiResponse } from 'next'
import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { GraphQLUpload, processRequest } from "graphql-upload"

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

interface IFile {
  filename?: string; 
  mimetype?: string; 
  encoding?: string; 
  createReadStream: () => ReadableStream; 
}

interface IContactFormDTO {
  files: Array<Promise<IFile>>,
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
        await Promise.all(data.files.map(async (file) => {
          return await file; 
        })) 
        return true; 
    },
  },
};

interface Data {};

const plugins = [];

if (DEBUG) {
    plugins.push(ApolloServerPluginLandingPageGraphQLPlayground());
}

interface NextApiRequestExtended extends NextApiRequest {
  filePayload?: any
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
  req: NextApiRequestExtended,
  res: NextApiResponse<Data>
) {
    await startServer

    const contentType = req.headers["content-type"]
    if (contentType && contentType.startsWith("multipart/form-data")) {
      (req as any).filePayload = await processRequest(req, res)
    }

    return await apolloServer.createHandler({ path: graphqlPath })(req, res)
}

export const config = {
    api: {
      bodyParser: false
    },
};