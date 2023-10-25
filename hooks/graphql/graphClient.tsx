import { ApolloClient, InMemoryCache } from "@apollo/client";

const APIURL =
  "https://api.studio.thegraph.com/query/46611/frens-graph/version/latest";

export const graphClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
