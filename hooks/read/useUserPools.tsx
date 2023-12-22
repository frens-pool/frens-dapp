import { Address } from "wagmi";
import { useEffect, useState } from "react";
import { queryPools } from "hooks/graphql/queryPools";

export function useUserPools(userAddress: Address) {
  const [userPools, setUserPools] = useState<Address[]>([]);

  useEffect(() => {
    fetchUserPools(userAddress);
  }, [userAddress]);

  const fetchUserPools = async (operatorAddress: Address) => {
    const poolsOfUser = await queryPools({ operatorAddress });
    setUserPools(
      poolsOfUser.data.creates.map((_: any) => _.contractAddress as Address)
    );
  };

  return userPools;
}
