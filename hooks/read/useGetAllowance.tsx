import { Address, useContractRead, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "../useNetworkName";
import { useEffect, useState } from "react";

export function useGetAllowance({ address }: { address: string }) {
  const network = useNetworkName();

  //   const { data: owner } = useWalletClient({
  //     onSuccess(data:any) {
  //       debugger;
  //       console.log(data);
  //     }
  //   });
  //   const registerContract = FrensContracts[network].SSVNetworkContract;

  const { data, isLoading, isSuccess } = useContractRead({
    address: FrensContracts[network].SSVTokenContract.address,
    abi: FrensContracts[network].SSVTokenContract.abi,
    functionName: "allowance",
    args: [address],
  });

  return { data, isLoading, isSuccess };
}
