import { useQuery, gql } from "@apollo/client";
import PoolCard from "../dashboard/PoolCard";
import { PoolType } from "#/types/commonTypes";

const GET_POOLS = gql`
  query GetPools {
    creates(first: 60) {
      deposits {
        amount
      }
      contractAddress
      creator
    }
  }
`;

export const PoolList = () => {
  const { loading, error, data } = useQuery(GET_POOLS);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-frens-main"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data?.creates.map((pool: PoolType) => (
        <PoolCard
          pool={pool}
          key={pool.contractAddress}
          showClusterInfo={false}
        />
      ))}
    </div>
  );
};
