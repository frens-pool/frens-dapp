import { queryPools } from "hooks/graphql/queryPools";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const PoolList = () => {
  const { address } = useAccount();
  const [userPools, setUserPools] = useState<any>([]);

  useEffect(() => {
    fetchUserPools();
  }, []);

  const fetchUserPools = async () => {
    let poolsOfUser = await queryPools({
      operatorAddress: `0x${address?.toString().slice(2)}`,
    });
    setUserPools(poolsOfUser.data.creates);
  };

  return (
    <div className="bg-white">
      <div>Your pools:</div>
      {userPools.map(({ contractAddress }: any) => (
        <div key={contractAddress}>
          <Link
            href={`/pool/${contractAddress}`}
            className="underline text-frens-main"
          >
            {contractAddress}
          </Link>
        </div>
      ))}
    </div>
  );
};
