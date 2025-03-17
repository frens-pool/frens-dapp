// import { Address } from "wagmi";
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useNetwork } from "wagmi";
import { mainnet, holesky } from "wagmi/chains";

export function useClusterScanner(ownerAddress: string, operatorIDs: number[]) {
  const { chain } = useNetwork();

  // Construct SSV API URL - moved up
  const network = chain?.id === mainnet.id ? 'mainnet' : 'holesky';
  const operatorString = operatorIDs?.join(',');
  const url = ownerAddress && operatorIDs?.length >= 4
    ? `https://api.ssv.network/api/v4/${network}/clusters/owner/${ownerAddress}/operators/${operatorString}`
    : null;

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR(url, async (url: string | URL | Request) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch cluster data');
    }
    return await response.json();
  });

  // Validation moved after hook
  if (!operatorIDs || operatorIDs.length < 4) {
    return { data: null, isLoading: false, error: new Error("No operatorIDs provided") };
  }
  if (!ownerAddress) {
    return { data: null, isLoading: false, error: new Error("No ownerAddress provided") };
  }

  return { data, isLoading, error };
}
