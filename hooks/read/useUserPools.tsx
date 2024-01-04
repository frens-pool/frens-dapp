import { Address } from "wagmi";
import { useQuery, gql } from "@apollo/client";

const buildQuery = ({ operatorAddress }: { operatorAddress: string }) => {
  const query = `
  {
    creates(where: {creator: "${operatorAddress}"}) {
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

export function useUserPools(operatorAddress: Address) {
  const userPoolsQuery = buildQuery({ operatorAddress });
  const { loading, error, data } = useQuery(gql(userPoolsQuery));

  return data;
}
