import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useNetwork } from "wagmi";
import { subgraphUrl } from "#/utils/externalUrls";

import { graphClient } from "./graphClient";
import { gql } from "@apollo/client";

const buildQuery = () => {
  const query = `
  {
    creates(first: 60) {
      deposits {
        amount
      }
      contractAddress
      creator
    }
  }
  `;
  return query;
};

export const queryAllPools = async () => {
  const { chain } = useNetwork();

  const graphClient = new ApolloClient({
    uri: `${subgraphUrl(chain)}`,
    cache: new InMemoryCache(),
  });

  const queryForPools = buildQuery();
  const response = await graphClient.query({
    query: gql(queryForPools),
  });
  return response;
};
