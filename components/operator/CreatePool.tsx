import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useContractEvent, useNetwork } from "wagmi";

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
  const { isConnected } = useAccount();

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
        <div className="flex flex-col items-start justify-start mt-4 mb-2 text-white">
          <div>
            <div role="status">
              <span className="loading loading-spinner text-frens-teal"></span>
            </div>
            <div className="my-2 ">Your pool is being created</div>
            <a
              className="underline"
              href={etherscanLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              view tx on etherscan
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-start">
      <div>
        {isLoading ? (
          <button
            disabled
            className="btn-large opacity-25 text-[#3F19EE] bg-white"
          >
            Loading ...
          </button>
        ) : (
          <div>
            {accountAddress ? (
              <button
                className="btn-large text-[#3F19EE] bg-white opacity-1"
                onClick={() => onCreatePool()}
              >
                Create new pool
              </button>
            ) : (
              <>
                <button
                  disabled={isConnected ? false : true}
                  className={
                    isConnected
                      ? "btn-large text-[#3F19EE] bg-white opacity-1"
                      : "btn-large text-[#3F19EE] bg-white opacity-50"
                  }
                >
                  Create new pool
                </button>
                <p className="text-white italic mt-8 font-light">
                  Please{" "}
                  <span
                    className="underline cursor-pointer"
                    onClick={() => {
                      if (openConnectModal) openConnectModal();
                    }}
                  >
                    connect your web3 wallet
                  </span>{" "}
                  to create a pool.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
