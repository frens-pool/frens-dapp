import { Address, useAccount, usePublicClient } from "wagmi";
import { useEffect, useState } from "react";
import { queryAllPools } from "hooks/graphql/queryAllPools";

export function useAllPools() {
  const { address } = useAccount();
  const [userPools, setUserPools] = useState<Address[]>([]);

  useEffect(() => {
    if (address) fetchUserPools(address);
  }, [address]);

  const fetchUserPools = async (operatorAddress: Address) => {
    const poolsOfUser = await queryAllPools({ operatorAddress });
    // console.log(poolsOfUser);
    setUserPools(
      poolsOfUser.data.creates.map((_: any) => _.contractAddress as Address)
    );
  };

  return userPools;
}
