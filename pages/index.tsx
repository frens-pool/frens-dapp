import type { NextPage } from "next";
import Head from "next/head";

import Header from "components/shared/Header";
import Footer from "components/shared/Footer";
import { PoolList } from "components/dashboard/PoolList";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import { useAllPools } from "#/hooks/read/useAllPools";

const Pools: NextPage = () => {
  const userPools = useAllPools();

  return (
    <div className="bg-white" data-theme="winter">
      <Head>
        <title>FRENS Pool</title>
        <meta name="description" content="stake with friends" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤙</text></svg>"
        />
      </Head>

      <Header />

      {/* Content */}
      <main className="relative -mt-32 ">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="bg-white min-h-[60vh] rounded-lg py-6 shadow px-4 sm:px-6 lg:px-16">
            {/* Heading */}
            <div className="pb-4 pt-6 sm:flex-nowrap sm:pb-6">
              <div className="pb-4 flex justify-between mx-auto max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                  Pool List
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
              <PoolList userPools={userPools} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pools;
