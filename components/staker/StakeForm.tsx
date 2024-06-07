import { useNetworkName } from "#/hooks/useNetworkName";
import { etherscanUrl } from "#/utils/externalUrls";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FrensContracts } from "utils/contracts";

import { ProgressBar } from "../shared/ProgressBar";

import {
  Address,
  useAccount,
  useBalance,
  useContractEvent,
  useNetwork,
} from "wagmi";
import { useDeposit } from "../../hooks/write/useDeposit";

interface Props {
  poolAddress: Address;
  poolBalance: any;
}

export const StakeForm = ({ poolAddress, poolBalance }: Props) => {
  const [maxDepositValue, setMaxDepositValue] = useState(32);
  const [isDepositing, setIsDepositing] = useState<boolean>(false);

  const { chain } = useNetwork();
  const network = useNetworkName();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const ethInputForm = watch("ethInput");
  const stakeAmount = ethInputForm > 0 ? ethInputForm.toString() : "0.1";

  const onSubmit = () => {
    if (deposit) deposit();
    setIsDepositing(true);
  };

  const { isConnected } = useAccount();
  useBalance({
    address: poolAddress,
    watch: true,
    onSuccess(data) {
      const poolBalanceNumber: number = +data.formatted;
      const maxDepositValue = 32 - poolBalanceNumber;
      setMaxDepositValue(maxDepositValue);
    },
  });
  const {
    data: depositData,
    write: deposit,
    isError,
    prepare_error,
  } = useDeposit({ address: poolAddress, val: stakeAmount });
  // console.log(depositData);
  const etherscanLink = `${etherscanUrl(chain)}/tx/${depositData?.hash}`;

  if (isError) setIsDepositing(false); //to handle user reject (metamask). throw react error but okay for now.

  useContractEvent({
    address: poolAddress,
    abi: FrensContracts[network].StakingPool.abi,
    eventName: "DepositToPool",
    listener: (log) => {
      setIsDepositing(false);
      reset();
    },
  });

  const getErrorMessage = (prepare_error: any) => {
    const message =
      prepare_error?.reason?.replace("execution reverted:", "") ??
      prepare_error.message;

    return message;
  };

  return (
    <form className="border-[1px] border-frens-blue text-frens-blue p-8 mb-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col items-start justify-start p-0 lg:p-4">
        <h2 className="font-bold text-[20px] lg:text-[30px] text-frens-gradient">Wanna pool together?</h2>
        {!isConnected ?
          <div className="w-full flex flex-row items-center justify-start py-4">
            <p className="text-black font-semibold flex-1">Please connect your web3 wallet to stake this pool</p>
            <ConnectButton.Custom>
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
                            <div
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
                                    <button className="bg-black border-2 border-black text-white font-semibold text-[14px] py-[8px] px-8 rounded-[22px]" onClick={openConnectModal} type="button">
                                      Connect wallet
                                    </button>
                                  );
                                }

                                if (chain.unsupported) {
                                  return (
                                    <button className="bg-black border-2 border-black text-white font-semibold text-[14px] py-[8px] px-8 rounded-[22px]" onClick={openChainModal} type="button">
                                      Wrong network
                                    </button>
                                  );
                                }

                                return (
                                    <button className="flex flex-row border-black border-2 bg-black text-white font-semibold text-[14px] py-[8px] pl-3 pr-4 rounded-[22px]" type="button">
                                    <div
                                      onClick={openChainModal}
                                      style={{ display: 'flex', alignItems: 'center' }}
                                      className="bg-[rgba(255,255,255,0.25)] text-white font-normal text-[14px] px-2 rounded-[10px] mr-2"
                                    >
                                      {chain.name}
                                    </div>
                                    <div onClick={openAccountModal}>
                                      {account.displayName}
                                      </div>
                                    </button>
                                );
                              })()}
                            </div>
                          );
                        }}
                      </ConnectButton.Custom>
          </div>
        :
        <div className="mt-4 mb-8 w-full">
          <div className={`my-2 ${isDepositing || !isConnected
              ? "opacity-25"
              : "opacity-1"
            }`}>Set your ETH amount</div>
          <div className="w-full flex flex-col lg:flex-row">
            <label className="flex-1">
              <input
                disabled={isDepositing || !isConnected ? true : false}
                {...register("ethInput", { max: maxDepositValue })}
                id="ethInput"
                type="number"
                placeholder="0.1"
                min="0"
                step="any"
                className="w-full max-w-[400px] lg:mr-4 input bg-transparent input-bordered border-frens-teal focus:border-frens-blue mb-4 lg:mb-0"
              />
            </label>
            {prepare_error ? (
              <button
                disabled
                className="rounded-[26px] text-[20px] leading-[30px] font-bold py-[11px] px-[32px] blue-to-teal text-white"
                type="submit"
              >
                create stake
              </button>
            ) : (
              <>{!isDepositing && (
                <button
                  disabled={isDepositing || !isConnected ? true : false}
                  className={`rounded-[26px] text-[20px] leading-[30px] font-bold py-[11px] px-[32px] blue-to-teal text-white ${isDepositing || !isConnected
                      ? "opacity-25"
                      : "opacity-1"
                    }`}
                  type="submit"
                >
                  create stake
                </button>
              )}
              </>
            )}            
          </div>
        </div>
        }
        {/*temp disable - causes error on full stake*/}
        {prepare_error && (
          <div className="text-center font-medium my-2">
            <div>Ur a true fren but unfortunatly</div>
            <div className="text-red-500">{getErrorMessage(prepare_error)}</div>
          </div>
        )}
        {errors.ethInput && (
          <div className="text-center font-medium my-2">
            <div>Ur a true fren but unfortunatly</div>
            <div className="text-red-500">max pool sum volume is 32.0 ETH</div>
          </div>
        )}
      </div>
      {isDepositing &&
        <div className="py-6 mb-8">
          {depositData?
              <>
                <div className="my-2 text-center italic">
                  Your transaction is being processed.
                </div>
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
              </>
              :
                <div className="my-2 text-center italic">
                  Please finish transaction in your wallet.
                </div>
              }
          </div>
        }
      <div className="w-full flex flex-1 flex-col lg:flex-row items-start justify-start bg-frens-very-light py-5 px-6">
        <p className="text-frens-blue mb-8 lg:mb-0 lg:mr-12">🚧<span className="italic"> Pool needs 32 ETH in stakes to be funded!</span></p>
        <div className="flex-1 flex flex-row items-end justify-start">
          <ProgressBar progressPercentage={((poolBalance/32)*100)} />          
          <h2 className="text-[20px] ml-2 -mb-2 font-extrabold text-frens-gradient">{poolBalance ? poolBalance : "0"} / 32 ETH</h2>
        </div>
      </div>
    </form>
  );
};
