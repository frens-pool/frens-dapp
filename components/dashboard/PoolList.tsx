import { queryPools } from "hooks/graphql/queryPools";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Address, useAccount } from "wagmi";

export const PoolList = () => {
  const { address } = useAccount();
  const [userPools, setUserPools] = useState<any[]>();

  useEffect(() => {
    if (address) fetchUserPools(address);
  }, [address]);

  const fetchUserPools = async (operatorAddress: Address) => {
    let poolsOfUser = await queryPools({ operatorAddress });
    console.log(poolsOfUser);
    setUserPools(poolsOfUser.data.creates);
  };

  if (!userPools) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">Loading pools</div>
      </div>
    );
  }
  if (userPools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">You haven&apos;t created any pools yet 🧐</div>
        <Link href="/">
          <button
            className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
          >
            Create a pool
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {userPools.map(({ contractAddress }: any) => (
        <div key={contractAddress}>
          <Link
            className="underline text-frens-main"
            href={`/pool/${contractAddress}`}
          >
            {contractAddress}
          </Link>
        </div>
      ))}
      <Link href="/">
        <button
          className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
        >
          Create a pool
        </button>
      </Link>
    </div>
  );
};
