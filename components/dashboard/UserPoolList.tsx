import Link from "next/link";
import Image from "next/image";
import { Address } from "wagmi";

interface Props {
  pools: Address[];
}

export const UserPoolList = ({ pools }: Props) => {
  if (!pools) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">Connect wallet to see your pools</div>
      </div>
    );
  }

  if (pools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">You haven&apos;t created any pools yet 🧐</div>
        <Link href="/create">
          <button className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white">
            Create a pool
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-">
      {pools.map((contractAddress) => (
        <Link
          href={`/pool/${contractAddress}`}
          key={contractAddress}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-2 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex justify-center p-2 mr-6">
            <Image
              src="/FRENS-logo-coloured.png"
              alt="FRENS logo"
              width="38"
              height="24"
            />
          </div>{" "}
          <div className="">{contractAddress}</div>
        </Link>
      ))}
    </div>
  );
};
