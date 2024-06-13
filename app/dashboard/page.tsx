"use client";

import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Address, useEnsName, useNetwork, useAccount } from "wagmi";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "components/shared/Header";
import { UserPoolList } from "#/components/dashboard/UserPoolList";
import { ShareList } from "components/dashboard/ShareList";

import { useUserNfts } from "#/hooks/read/useUserNFTs";
import { useUserPools } from "#/hooks/read/useUserPools";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard: NextPage = () => {
  const { userNFTs, totalDeposit, totalClaimable } = useUserNfts();
  const { isConnected, address } = useAccount();
  const userPools = useUserPools(address as Address);
  const { chain } = useNetwork();
  const [userENS, setUserENS] = useState("");


  const { data: ensName } = useEnsName({
    address: address,
    chainId: chain?.id ?? 5,
    cacheTime: 1_000,
  });

  useEffect(() => {
    if (ensName && address) {
      setUserENS(ensName.toString());
    }
  }, [ensName, address]);


  const stats = [
    // {
    //   name: "My Pools #",
    //   value: userPools?.creates.length,
    // },
    // {
    //   name: "Pool Shares #",
    //   value: userNFTs.length,
    // },
    {
      name: "ETH Deposited",
      value: totalDeposit.toFixed(4).toString(),
    },
    {
      name: "ETH claimable",
      value: totalClaimable.toFixed(4).toString(),
    },
  ];

  if (isConnected) {
    return (
      <div>
        <Header />
        {/* Content */}
        <main className="w-full pb-20 lg:pb-32">
              <div className="w-full flex flex-col items-start justify-start">
                <div className="w-full px-[8vw] pt-20 pb-8 text-black flex flex-1 flex-col items-start justify-start lg:mr-8 bg-[#F7F9FC]">
                  <p className="text-[10px] uppercase">Connected as</p>
                  {userENS?
                    <h1 className=" mt-[7px] font-semibold text-[28px]">{userENS}</h1>
                    :
                    <h1 className=" mt-[7px] font-semibold text-[28px]">{address?`${address.slice(0,4)}...${address.slice(-4)}`:null}</h1>
                  }
                </div>
                <div className="w-full px-[8vw] pt-12 pb-6 flex flex-col lg:flex-row items-start justify-start ">
                  {stats.map((stat, statIdx) => (
                    <div
                      key={stat.name}
                      className="flex flex-col items-start justify-start lg:mr-12"
                    >
                      <p className="text-[10px] uppercase text-frens-blue">
                        {stat.name}
                      </p>
                      <h1 className="text-[34px] font-extrabold">
                        {stat.value} ETH
                      </h1>
                    </div>
                  ))}
                  </div>
              </div>
              <div className="w-full px-[8vw] py-6 flex flex-col items-start justify-start ">
                <p className="text-[10px] uppercase text-frens-blue">Pools you own</p>
                <UserPoolList operatorAddress={address as Address} />
              </div>
              <div className="w-full px-[8vw] py-6 flex flex-col items-start justify-start ">
                <p className="text-[10px] uppercase text-frens-blue">Shares you own</p>
                <ShareList userNFTs={userNFTs} />
              </div>

              {/* <div className="pb-4 pt-6 sm:flex-nowrap sm:pb-6">
                <div className="pb-4 flex justify-between mx-auto max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                  <h1 className="text-base font-semibold leading-7 text-gray-900">
                    My own pools
                  </h1>
                  <Link
                    href="/create"
                    className="ml-auto flex items-center gap-x-1"
                  >
                    <button className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white">
                      <PlusSmallIcon
                        className="-ml-1.5 h-5 w-5"
                        aria-hidden="true"
                      />
                      New pool
                    </button>
                  </Link>
                </div>
                <UserPoolList operatorAddress={address as Address} />
              </div> 
              <div className="pb-4 pt-6 sm:flex-nowrap sm:pb-6">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                  <h1 className="text-base font-semibold leading-7 text-gray-900 mb-2">
                    My pool shares
                  </h1>
                </div>
                <ShareList userNFTs={userNFTs} />
              </div>*/}
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white" data-theme="winter">
      <Header />
      <main className="relative -mt-32 ">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center rounded-lg py-6 shadow px-4 sm:px-6 lg:px-16">
            <div>Connect wallet to see personal dashboard</div>
            <div className="mt-6">
              <ConnectButton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
