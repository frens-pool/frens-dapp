import { graphClient } from "./graphClient";
import { gql } from "@apollo/client";
import { Address } from "wagmi";

const buildQuery = ({ operatorAddress }: { operatorAddress: string }) => {
  const query = `
  {
    creates(first: 100) {
      contractAddress
    }
  }
  `;
  return query;
};

export const queryAllPools = async ({
  operatorAddress,
}: {
  operatorAddress: Address;
}) => {
  const queryForPools = buildQuery({ operatorAddress });
  const response = await graphClient.query({
    query: gql(queryForPools),
  });
  return response;
};
