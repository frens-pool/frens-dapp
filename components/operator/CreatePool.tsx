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
      <div className="flex items-start justify-start">
        <div>
          {isLoading ? (
            <button disabled className="btn text-white">
              Loading ...
            </button>
          ) : (
            <div>
              {accountAddress ? (
                <button
                  className="btn-large text-[#3F19EE] bg-white"
                  onClick={() => onCreatePool()}
                >
                  Create new pool
                </button>
              ) : (
                <button
                  className="text-[22px] py-[20px] px-[68px] font-bold text-[#3F19EE] bg-white rounded-[34px]"
                  onClick={() => {
                    if (openConnectModal) openConnectModal();
                  }}
                >
                  Create new pool
                </button>
              )}
            </div>
          )}
        </div>
      </div>
  );
};
