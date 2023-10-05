import { queryPools } from "hooks/graphql/queryPools";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Address, useAccount } from "wagmi";
import { UserGroupIcon } from "@heroicons/react/20/solid";

export const PoolList = () => {
  const { address } = useAccount();
  const [userPools, setUserPools] = useState<any[]>();

  useEffect(() => {
    if (address) fetchUserPools(address);
  }, [address]);

  const fetchUserPools = async (operatorAddress: Address) => {
    const poolsOfUser = await queryPools({ operatorAddress });
    console.log(poolsOfUser);
    setUserPools(poolsOfUser.data.creates);
  };

  if (!userPools) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">Connect wallet to see your pools</div>
      </div>
    );
  }
  if (userPools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">You haven&apos;t created any pools yet 🧐</div>
        <Link href="/">
          <button className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white">
            Create a pool
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-">
      {userPools.map(({ contractAddress }: any) => (
        <div
          key={contractAddress}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <UserGroupIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
          <Link
            className="underline text-frens-main"
            href={`/pool/${contractAddress}`}
          >
            {contractAddress}
          </Link>
        </div>
      ))}
    </div>
  );
};
