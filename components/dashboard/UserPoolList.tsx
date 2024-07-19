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
      id
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
  const [registerThesePools, setRegisterThesePools] = useState<PoolType[]>([]);
  const [openPools, setOpenPools] = useState<PoolType[]>([]);
  const [stakedPools, setStakedPools] = useState<PoolType[]>([]);

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

  const setPoolState = (pool: PoolType, poolState: String) => {
    const poolBalance = pool.deposits?.reduce(
      (acc, current) => acc + parseInt(current.amount, 10),
      0
    );

    if (
      poolBalance === 32000000000000000000 &&
      poolState === "accepting deposits"
    ) {
      setRegisterThesePools((prevPools) => [...prevPools, pool]);
    }
    if (
      poolBalance !== 32000000000000000000 &&
      poolState === "accepting deposits"
    ) {
      setOpenPools((prevPools) => [...prevPools, pool]);
    }
    if (poolState === "staked") {
      setStakedPools((prevPools) => [...prevPools, pool]);
    }
  };

  const getStateOfPool = async (pool: PoolType) => {
    const poolState = (await publicClient.readContract({
      address: pool.contractAddress,
      abi: FrensContracts[network].StakingPool.abi,
      functionName: "getState",
    })) as string;

    setPoolState(pool, poolState);
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
    <>
      {registerThesePools.length > 0 && (
        <div className="mb-8">
          <div className="inline-block bg-[#FFFAE6] my-4 py-3 px-4">
            <p className="font-bold">
              🚀 Take action!{" "}
              <span className="font-normal">
                You can run the validator of following pools:
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {registerThesePools?.map((pool: PoolType) => (
              <PoolCard pool={pool} key={pool.id} showClusterInfo={false} />
            ))}
          </div>
        </div>
      )}

      {openPools.length > 0 && (
        <div>
          <div className="inline-block bg-frens-very-light my-4 py-3 px-4">
            <p className="font-bold">
              🙋‍♂️ Still collecting!{" "}
              <span className="font-normal">
                Gather your frens and get that 32 ETH in following pools:
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {openPools?.map((pool: PoolType) => (
              <PoolCard pool={pool} key={pool.id} showClusterInfo={false} />
            ))}
          </div>
        </div>
      )}

      {stakedPools.length > 0 && (
        <div>
          <div className="inline-block cursor-pointer border-[1px] border-frens-teal my-4 py-3 px-4">
            <p className="font-bold">🤙 Up and running!</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {stakedPools?.map((pool: PoolType) => (
              <PoolCard pool={pool} key={pool.id} showClusterInfo={true} />
            ))}
          </div>
        </div>
      )}

      {poolStates.length === 0 && (
        <p className="w-full italic mt-2 mb-2">
          You don&apos;t own any pools yet.
        </p>
      )}
    </>
  );
};
