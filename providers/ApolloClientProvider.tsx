import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import config from "../config";
import { persistCache } from "apollo-cache-persist";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
import storage from 'redux-persist/lib/storage';

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: storage as any 
});

const client = new ApolloClient({ cache });
export const apolloClient = client; 

type ApolloClientProviderProps = { children: React.ReactChild };

const ApolloClientProvider: React.FC<ApolloClientProviderProps> = ({ children }) => {    
    const link = createUploadLink({
      uri: `${config.api.url}/graphql`,
      headers: {
        "keep-alive": "true",
        "credentials": "include",
        'Content-Type': 'application/json',
      }
    })

    client.setLink(link);
  
    return (
      <ApolloProvider client={client}>
        { children }
      </ApolloProvider>
    )
}

export default ApolloClientProvider; 