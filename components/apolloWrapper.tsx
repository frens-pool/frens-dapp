"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/46611/frens-graph/version/latest",
  cache: new InMemoryCache(),
});

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
