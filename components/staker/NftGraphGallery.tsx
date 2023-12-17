import { useQuery, gql } from "@apollo/client";

import { Address } from "wagmi";
import { formatEther } from "viem";

interface Props {
  poolAddress: Address;
}

type Deposit = {
  id: any;
  amount: any;
  depositer: String;
  nftId: String;
  poolAddress: String;
};

const buildDepositsQuery = ({ poolAddress }: { poolAddress: string }) => {
  const query = gql`
    {
      depositToPools(where: {poolAddress: "${poolAddress}"}) {
        id
        amount
        depositer
        nftId
        poolAddress
      }
    }
    `;
  return query;
};

export const NftGraphGallery = ({ poolAddress }: Props) => {
  const GET_POOL_DEPOSITS = buildDepositsQuery({ poolAddress });
  const { loading, error, data } = useQuery(GET_POOL_DEPOSITS);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-frens-main"></span>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.depositToPools.map(
          ({ id, amount, depositer, nftId }: Deposit) => (
            <div key={id}>
              <div>ID: {nftId} </div>
              <div>
                Amount:{" "}
                <span className="text-frens-main">
                  {formatEther(BigInt(amount))} Ξ
                </span>
              </div>
            </div>
          )
        )}
      </div>
      <div className="mt-6">
        This is a preview: Connect wallet to see full NFT
      </div>
    </div>
  );
};
