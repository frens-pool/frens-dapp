import { ApolloClient, InMemoryCache } from "@apollo/client";

const APIURL = "https://api.studio.thegraph.com/query/46611/frens-graph/v0.0.1";

export const graphClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
