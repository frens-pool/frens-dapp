"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useNetwork } from "wagmi";
import { subgraphUrl } from "#/utils/externalUrls";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const { chain } = useNetwork();

  const client = new ApolloClient({
    uri: `${subgraphUrl(chain)}`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
