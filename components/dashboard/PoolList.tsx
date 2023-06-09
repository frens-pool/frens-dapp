import { queryPools } from "hooks/graphql/queryPools";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Address, useAccount, useContract } from "wagmi";

export const PoolList = () => {
  const { address } = useAccount();
  const [userPools, setUserPools] = useState<any[]>([]);

  useEffect(() => {
    if (address) fetchUserPools(address);
  }, [address]);

  const fetchUserPools = async (operatorAddress: Address) => {
    let poolsOfUser = await queryPools({ operatorAddress });
    setUserPools(poolsOfUser.data.creates);
  };

  return (
    <div className="bg-white">
      <div>Your pools:</div>
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
    </div>
  );
};
