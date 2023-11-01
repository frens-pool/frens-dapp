import { graphClient } from "./graphClient";
import { gql } from "@apollo/client";
import { Address } from "wagmi";

const buildQuery = ({ poolAddress }: { poolAddress: string }) => {
  const query = `
  {
    depositToPools(where: {poolAddress: "${poolAddress}"}) {
      id
      amount
      depositer
      nftId
      poolAddress
    }
  }
  `;
  return query;
};

export const queryDeposits = async ({
  poolAddress,
}: {
  poolAddress: Address;
}) => {
  const queryForPools = buildQuery({ poolAddress });
  const response = await graphClient.query({
    query: gql(queryForPools),
  });
  return response;
};
