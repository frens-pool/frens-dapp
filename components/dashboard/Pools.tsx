import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import { formatEther } from "viem";

import { UserGroupIcon } from "@heroicons/react/20/solid";
import { Address } from "wagmi";

interface Deposits {
  amount: string;
}

interface Pool {
  contractAddress: Address;
  creator: Address;
  deposits: Deposits[];
}

const GET_POOLS = gql`
  query GetPools {
    creates(first: 60) {
      deposits {
        amount
      }
      contractAddress
      creator
    }
  }
`;

export const Pools = () => {
  const { loading, error, data } = useQuery(GET_POOLS);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-">
      {data.creates.map((pool: Pool) => (
        <div
          key={pool.contractAddress}
          className="relative flex flex-col items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div>
            <UserGroupIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
            <Link
              className="underline text-frens-main"
              href={`/pool/${pool.contractAddress}`}
            >
              {pool.contractAddress}
            </Link>
          </div>
          <div>
            <div>{pool.deposits.length}</div>
            <div>
              {formatEther(
                BigInt(
                  pool.deposits?.reduce(
                    (acc, current) => acc + parseInt(current.amount, 10),
                    0
                  )
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
