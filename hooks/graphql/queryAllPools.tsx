import { graphClient } from "./graphClient";
import { gql } from "@apollo/client";

const buildQuery = () => {
  const query = `
  {
    creates(first: 100) {
      contractAddress
    }
  }
  `;
  return query;
};

export const queryAllPools = async () => {
  const queryForPools = buildQuery();
  const response = await graphClient.query({
    query: gql(queryForPools),
  });
  return response;
};
