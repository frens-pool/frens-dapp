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
    return (
        <p className="w-full italic mt-6 mb-24">No pool stakes here yet.</p>
    );
  }
  return (
    <div className="w-full bg-white">
      <div className="w-full flex flex-row py-2">
      <div className="text-[10px] uppercase text-black w-[10%]">Stake ID</div>
      <div className="text-[10px] uppercase text-black w-[20%]">Stake amount</div>
      <div className="text-[10px] uppercase text-black w-[70%]">Stake owner</div>

      </div>
      <div className="w-full flex flex-col-reverse items-start justify-start">
        {data.depositToPools.map(
          ({ id, amount, depositer, nftId }: Deposit) => (
            <div className="w-full border-b-[1px] border-slate-200 flex flex-row py-2" key={id}>
                <div className="font-semibold mt-1  w-[10%]">{nftId}</div>
                <div className="font-semibold text-frens-blue mt-1 w-[20%]">{formatEther(BigInt(amount))} ETH</div>
                <div className="font-semibold mt-1 w-[70%]">
                {`${depositer.slice(
                0,
                6
              )}...${depositer.slice(-4)}`}
                </div>
            </div>
          )
        )}
      </div>
      <div className="mt-10 italic">
        <p>(This is a preview: <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <span className="underline inline-block cursor-pointer" onClick={openConnectModal}
                {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                          "connect your web3 wallet"
                      );
                    }

                    if (chain.unsupported) {
                      return (
                          "Wrong network"
                      );
                    }

                    return (
                          ""
                    );
                  })()}
                </span>
              );
            }}
          </ConnectButton.Custom> to see full NFT)</p>
      </div>
    </div>
  );
};
