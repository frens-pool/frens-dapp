import Image from "next/image";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import { formatEther } from "viem";
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
        <span className="loading loading-spinner loading-lg text-frens-main"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data?.creates.map((pool: Pool) => (
        <Link
          href={`/pool/${pool.contractAddress}`}
          key={pool.contractAddress}
          className="relative flex flex-col items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="w-full flex flex-row justify-between">
            <div className="flex justify-center p-2 mr-6">
              <Image
                src="/FRENS-logo-coloured.png"
                alt="FRENS logo"
                width="38"
                height="24"
              />
            </div>
            <div className="w-full grid grid-cols-3 gap-2">
              <div className="h-full flex flex-col items-center justify-center">
                <div>Address</div>
                <div>
                  {`${pool.contractAddress.slice(
                    0,
                    4
                  )}...${pool.contractAddress.slice(-4)}`}
                </div>
              </div>

              <div className="h-full flex flex-col items-center justify-center">
                <div>Deposits</div>
                <div className="text-frens-main">{pool.deposits.length}</div>
              </div>
              <div className="h-full flex flex-col items-center justify-center">
                <div>TVL</div>
                <div className="text-frens-main">
                  {formatEther(
                    BigInt(
                      pool.deposits?.reduce(
                        (acc, current) => acc + parseInt(current.amount, 10),
                        0
                      )
                    )
                  )}{" "}
                  Ξ
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
