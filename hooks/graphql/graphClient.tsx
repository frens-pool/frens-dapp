import { ApolloClient, InMemoryCache } from "@apollo/client";

const APIURL = "https://api.studio.thegraph.com/query/43173/frenspool/v0.0.1";

export const graphClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
