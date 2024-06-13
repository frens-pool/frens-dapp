"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { Address, useAccount } from "wagmi";
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
        <main className="w-full px-[8vw] pb-20 lg:pb-40">
              <div className="w-full flex flex-col items-start justify-start">
                <div className="w-full pt-20 pb-8">
                  <h1 className="text-black font-extrabold text-[30px]">My dashboard</h1>
                </div>

                      {stats.map((stat, statIdx) => (
                        <div
                          key={stat.name}
                          className="flex"
                        >
                          <dt className="text-sm font-medium leading-6 text-gray-500">
                            {stat.name}
                          </dt>
                          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
              </div>

              {/* Heading */}
              <div className="pb-4 pt-6 sm:flex-nowrap sm:pb-6">
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
              {/* Heading */}
              <div className="pb-4 pt-6 sm:flex-nowrap sm:pb-6">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                  <h1 className="text-base font-semibold leading-7 text-gray-900 mb-2">
                    My pool shares
                  </h1>
                </div>
                <ShareList userNFTs={userNFTs} />
              </div>
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
