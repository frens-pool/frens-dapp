import { useQuery, gql } from "@apollo/client";

import { Address } from "wagmi";
import { formatEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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

  if (data.depositToPools.length === 0) {
    return <p className="w-full italic mt-6 mb-24">No pool stakes here yet.</p>;
  }
  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.depositToPools.map(
          ({ id, amount, depositer, nftId }: Deposit) => (
            <div
              key={id}
              className="w-full flex flex-col items-start justify-start"
            >
              <div className="w-full relative" key={id}>
                <div className="w-full text-center z-[9] absolute top-[40%] text-[32px] text-white font-extrabold mt-1 w-[20%]">
                  {formatEther(BigInt(amount))} ETH
                </div>
                <div className="font-bold z-[8] text-white text-[8.5px] absolute bottom-[21px] mt-1 w-full text-center">
                  {depositer}
                </div>
                <img
                  className="top-0 left-0 w-full z-[1] rounded-[10px]"
                  src="/FRENS_tokens_bg.png"
                  alt="Tokens bg"
                />
              </div>
              <div className="w-full flex flex-row items-center justify-start border-frens-blue border-dashed border-[1px] border-t-0 rounded-b-[10px] -mt-2 pt-6 pb-4 px-5">
                <div className="flex flex-col items-start justify-start w-[50%]">
                  <div className="text-frens-blue uppercase text-[10px]">
                    STAKE Owner
                  </div>
                  <div>
                    {`${depositer.slice(0, 6)}...${depositer.slice(-4)}`}
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start w-[50%]">
                  <div className="text-frens-blue uppercase text-[10px]">
                    Current stake reward
                  </div>
                  <div>0,45 ETH</div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
