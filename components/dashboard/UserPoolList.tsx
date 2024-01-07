import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Address, usePublicClient } from "wagmi";
import { useNetworkName } from "#/hooks/useNetworkName";
import { FrensContracts } from "#/utils/contracts";
import { PoolType } from "#/types/commonTypes";
import PoolCard from "./PoolCard";

interface UserPoolList {
  operatorAddress: Address;
}

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

export const UserPoolList = ({ operatorAddress }: UserPoolList) => {
  const userPoolsQuery = buildQuery({ operatorAddress });
  const { loading, error, data: userPools } = useQuery(gql(userPoolsQuery));
  const network = useNetworkName();

  const poolCreates = userPools?.creates;
  const [poolStates, setPoolStates] = useState<any[]>([]);
  const publicClient = usePublicClient();

  useEffect(() => {
    if (poolCreates) {
      setPoolStatesArray();
    }
  }, [poolCreates]);

  const setPoolStatesArray = async () => {
    const statesOfPools = await Promise.all(
      poolCreates.map(async (pool: PoolType) => await getStateOfPool(pool))
    );
    setPoolStates(statesOfPools);
  };

  const getStateOfPool = async (pool: PoolType) => {
    const poolState = (await publicClient.readContract({
      address: pool.contractAddress,
      abi: FrensContracts[network].StakingPool.abi,
      functionName: "getState",
    })) as string;

    return { ...pool, poolState };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-frens-main"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-4 mb-2 text-base font-semibold leading-7 text-gray-900">
        Take action. You can run this validator
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {poolStates?.map(
          (pool: PoolType) =>
            pool.deposits?.reduce(
              (acc, current) => acc + parseInt(current.amount, 10),
              0
            ) === 32000000000000000000 &&
            pool.poolState === "accepting deposits" && (
              <PoolCard pool={pool} key={pool.contractAddress} />
            )
        )}
      </div>

      <div className="mt-4 mb-2 text-base font-semibold leading-7 text-gray-900">
        Still colleting
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {poolStates?.map(
          (pool: PoolType) =>
            pool.poolState === "accepting deposits" && (
              <PoolCard pool={pool} key={pool.contractAddress} />
            )
        )}
      </div>

      <div className="mt-4 mb-2 text-base font-semibold leading-7 text-gray-900">
        Good job you setup these valis setup!
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {poolStates?.map(
          (pool: PoolType) =>
            pool.poolState === "staked" && (
              <PoolCard pool={pool} key={pool.contractAddress} />
            )
        )}
      </div>
    </div>
  );
};
