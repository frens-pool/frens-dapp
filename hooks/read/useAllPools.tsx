import { Address, useAccount, usePublicClient } from "wagmi";
import { useEffect, useState } from "react";
import { queryAllPools } from "hooks/graphql/queryAllPools";

export function useAllPools() {
  const [userPools, setUserPools] = useState<Address[]>([]);

  useEffect(() => {
    fetchAllPools();
  }, []);

  const fetchAllPools = async () => {
    const poolsOfUser = await queryAllPools();
    // console.log(poolsOfUser);
    setUserPools(
      poolsOfUser.data.creates.map((_: any) => _.contractAddress as Address)
    );
  };

  return userPools;
}
