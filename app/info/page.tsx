"use client";

import type { NextPage } from "next";

import Header from "components/shared/Header";
import { PoolList } from "components/shared/PoolList";
import Link from "next/link";
import { useAccount, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "#/hooks/useNetworkName";

const Home: NextPage = () => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const network = useNetworkName();

  // Get provider details from chain configuration
  const rpcUrls = chain?.rpcUrls?.default;
  const httpUrl = rpcUrls?.http[0] || 'Not available';
  const wsUrl = rpcUrls?.webSocket?.[0] || 'Not available';

  return (
    <div>
      <Header />
      {/* Content */}
      <main className="w-full pb-20 lg:pb-40">
        {/* Heading */}
        <h1>Info</h1>
        <ul>
          <li>chain : {chain?.name} (ID:{chain?.id})</li>
          <li>factory addr: {FrensContracts[network].StakingPoolFactory.address}</li>
          <li>HTTP Provider: {httpUrl}</li>
          <li>WebSocket Provider: {wsUrl}</li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
