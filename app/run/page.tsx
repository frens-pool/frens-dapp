"use client";

import type { NextPage } from "next";
import Header from "components/shared/Header";
import { UserPoolList } from "#/components/dashboard/UserPoolList";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import { useUserPools } from "#/hooks/read/useUserPools";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Run: NextPage = () => {
  const { isConnected } = useAccount();
  const userPools = useUserPools();

  if (isConnected) {
    return (
      <div className="bg-white" data-theme="winter">
        <Header />
        {/* Content */}
        <main className="relative -mt-32 ">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg py-6 shadow px-4 sm:px-6 lg:px-16">
              {/* Heading */}
              <div className="pb-4 pt-6 sm:flex-nowrap sm:pb-6">
                <div className="pb-4 flex justify-between mx-auto max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                  <h1 className="text-base font-semibold leading-7 text-gray-900">
                    My Pools
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
                <UserPoolList pools={userPools} />
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
            <div>Connect wallet to run a validator</div>
            <div className="mt-6">
              <ConnectButton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Run;
