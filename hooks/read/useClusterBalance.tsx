// import { Address } from "wagmi";
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useContractRead, useNetwork } from "wagmi";
import { mainnet, holesky } from "wagmi/chains";
import { useNetworkName } from '../useNetworkName';
import { FrensContracts } from '#/utils/contracts';
import { useClusterScanner } from './useClusterScanner';
import { BigNumber } from 'ethers';

export function useClusterBalance(ownerAddress: string, operatorIDs: number[]) {
  const { chain } = useNetwork();
  const { data : cluster } = useClusterScanner(ownerAddress,operatorIDs);
  const network = useNetworkName();

  console.log(`useClusterBalance cluster=`,cluster);

  const { data: rawData, isLoading, isSuccess } = useContractRead({
    address: FrensContracts[network].SSVNetworkViewsContract.address,
    abi: FrensContracts[network].SSVNetworkViewsContract.abi,
    functionName: "getBalance",
    args: [ownerAddress,operatorIDs,cluster?.cluster],
  });

  const data = rawData ? BigNumber.from(rawData) : null;

  return { data, isLoading, isSuccess };
}
