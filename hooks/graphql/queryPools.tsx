import { graphClient } from "./graphClient";
import { gql } from "@apollo/client";

const buildQuery = ({ operatorAddress }: { operatorAddress: string }) => {
  const query = `
  {
    creates(where: {owner: "${operatorAddress}"}) {
      contractAddress
    }
  }
  `;
  return query;
};

export const queryPools = async ({
  operatorAddress,
}: {
  operatorAddress: string;
}) => {
  const queryForPools = buildQuery({ operatorAddress });
  const response = await graphClient.query({
    query: gql(queryForPools),
  });
  return response;
};
