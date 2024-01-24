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
    {
      name: "My Pools #",
      value: userPools?.creates.length,
    },
    {
      name: "Pool Shares #",
      value: userNFTs.length,
    },
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
        <main className="relative -mt-32 ">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg py-6 shadow px-4 sm:px-6 lg:px-16">
              <div className="relative isolate overflow-hidden pt-0">
                <div className="pt-6 sm:pb-6">
                  {/* Heading */}
                  <div className="pb-4 mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                    <h1 className="text-base font-semibold leading-7 text-gray-900">
                      Statistics
                    </h1>
                  </div>
                  {/* Stats */}
                  <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
                    <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                      {stats.map((stat, statIdx) => (
                        <div
                          key={stat.name}
                          className={classNames(
                            statIdx % 2 === 1
                              ? "sm:border-l"
                              : statIdx === 2
                              ? "lg:border-l"
                              : "",
                            "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                          )}
                        >
                          <dt className="text-sm font-medium leading-6 text-gray-500">
                            {stat.name}
                          </dt>
                          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
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
            </div>
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
