import type { NextPage } from "next";
import Head from "next/head";

import Header from "components/shared/Header";

import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import { PoolList } from "components/dashboard/PoolList";
import { ShareList } from "components/dashboard/ShareList";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const secondaryNavigation = [
  { name: "Last 7 days", href: "#", current: true },
  { name: "Last 30 days", href: "#", current: false },
  { name: "All-time", href: "#", current: false },
];
const stats = [
  {
    name: "My Pools #",
    value: "20",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Pool Shares #",
    value: "40",
  },
  {
    name: "ETH Deposited",
    value: "34.123",
  },
  {
    name: "ETH claimalbe",
    value: "0.16",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard: NextPage = () => {
  return (
    <div className="bg-gray-100" data-theme="winter">
      <Head>
        <title>FRENS Pool</title>
        <meta name="description" content="stake with friends" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤙</text></svg>"
        />
      </Head>

      <Header />

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            <div className="relative isolate overflow-hidden pt-0">
              <div className="pt-6 px-4 sm:px-6 sm:pb-6 lg:px-8 ">
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
            <div className="pb-4 pt-6 px-4 sm:flex-nowrap sm:px-6 sm:pb-6 lg:px-8">
              <div className="pb-4 flex justify-between mx-auto max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                  My Pools
                </h1>
                <Link href="/" className="ml-auto flex items-center gap-x-1">
                  <button className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white">
                    <PlusSmallIcon
                      className="-ml-1.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    New pool
                  </button>
                </Link>
              </div>
              <PoolList />
            </div>
            {/* Heading */}
            <div className="pb-4 pt-6 px-4 sm:flex-nowrap sm:px-6 sm:pb-6 lg:px-8">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                  My Shares
                </h1>
              </div>
              <ShareList />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* <Navbar /> */}
    </div>
  );
};

export default Dashboard;
