import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { UserGroupIcon } from "@heroicons/react/20/solid";
import { Address } from "wagmi";

interface Props {
  pools: Address[];
}

export const PoolList = ({ pools }: Props) => {
  if (!pools || pools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-">
      {pools.map((contractAddress) => (
        <div
          key={contractAddress}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <UserGroupIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
          <Link
            className="underline text-frens-main"
            href={`/pool/${contractAddress}`}
          >
            {contractAddress}
          </Link>
        </div>
      ))}
    </div>
  );
};
