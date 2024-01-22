import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useContractEvent, useNetwork } from "wagmi";
import Link from "next/link";

import { etherscanUrl } from "#/utils/externalUrls";
import { FrensContracts } from "utils/contracts";
import { useCreatePool } from "../../hooks/write/useCreatePool";
import { useNetworkName } from "#/hooks/useNetworkName";

export const CreatePool = ({
  onFinish,
  setPoolContract,
}: {
  onFinish: () => void;
  setPoolContract: any;
}) => {
  const { address: accountAddress } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { chain } = useNetwork();
  const network = useNetworkName();

  const { data, isLoading, write: createPool } = useCreatePool();

  function onCreatePool(): void {
    if (createPool) createPool();
  }

  useContractEvent({
    address: FrensContracts[network].StakingPoolFactory.address,
    abi: FrensContracts[network].StakingPoolFactory.abi,
    eventName: "Create",
    listener: (node) => {
      // @ts-ignore
      setPoolContract(node[0].args.contractAddress);
      onFinish();
    },
  });

  if (data) {
    const etherscanLink = `${etherscanUrl(chain)}/tx/${data.hash}`;

    return (
      <div>
        {/* <div className="my-2">
          You will get a link to your own personal staking pool
        </div> */}
        <div className="flex items-center justify-center mt-4 mb-2">
          <div>
            <div className="my-2">just a sec ... pool is getting created</div>
            <div className="flex justify-center">
              <div role="status">
                <span className="loading loading-spinner text-frens-main"></span>
              </div>
              <a
                className="underline text-frens-main pl-2"
                href={etherscanLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                view tx on etherscan
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="my-2">
        You will get a shareable link to your own personal staking pool
      </div>
      <div className="flex items-center justify-center mt-4 mb-2">
        <div>
          {isLoading ? (
            <button disabled className="btn text-white">
              Loading ...
            </button>
          ) : (
            <div>
              {accountAddress ? (
                <button
                  className="btn text-white bg-gradient-to-r from-frens-blue to-frens-teal"
                  onClick={() => onCreatePool()}
                >
                  Create Pool
                </button>
              ) : (
                <button
                  className="btn text-white bg-gradient-to-r from-frens-blue to-frens-teal"
                  onClick={() => {
                    if (openConnectModal) openConnectModal();
                  }}
                >
                  Create Pool
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
