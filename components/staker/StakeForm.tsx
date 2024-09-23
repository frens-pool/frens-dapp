import { useNetworkName } from "#/hooks/useNetworkName";
import { etherscanUrl } from "#/utils/externalUrls";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FrensContracts } from "utils/contracts";
import { parseEther } from "viem";
import { ethers } from "ethers";
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

export const StakeForm = ({ poolAddress , poolBalance}: Props) => {
  const [maxDepositValue, setMaxDepositValue] = useState<bigint>(parseEther("32"));
  const [depositAmount, setDepositAmount] = useState<bigint>(parseEther("0.1"));

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

  const onSubmit = () => {
    if (deposit) deposit();
    setIsDepositing(true);
  };

  const setMax = () => {
    setDepositAmount(maxDepositValue);
  };

  const setAmount = (amount: string) => {
    setDepositAmount(BigInt(ethers.utils.parseUnits(amount, "ether").toString()));
  }

  const { isConnected } = useAccount();
  useBalance({
    address: poolAddress,
    watch: true,
    onSuccess(data) {
      const poolBalanceNumber: bigint = data.value;
      const maxDepositValue: bigint = parseEther("32") - poolBalanceNumber;
      setMaxDepositValue(maxDepositValue);
    },
  });
  const {
    data: depositData,
    write: deposit,
    isError,
    prepare_error,
  } = useDeposit({ address: poolAddress, val: depositAmount });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white">
        <div className="text-center font-bold my-2">Select ETH amount</div>
        <label className="input-group flex justify-center">
          <input
            {...register("ethInput", { max: ethers.utils.formatEther(maxDepositValue) })}
            id="ethInput"
            type="number"
            placeholder={ethers.utils.formatEther(depositAmount)}
            min="0"
            step="any"
            className="input input-bordered w-1/3"
            onChange={(e) => { setAmount(e.target.value) }}
          />
          <button
            className="btn text-white bg-gradient-to-r from-frens-blue to-frens-teal"
            type="button"
            onClick={setMax}
          >Max</button>
        </label>
        {/*temp disable - causes error on full stake*/}
        {/* {prepare_error && (
          <div className="text-center font-medium my-2">
            <div>Ur a true fren but unfortunatly</div>
            <div className="text-red-500">{getErrorMessage(prepare_error)}</div>
          </div>
        )} */}
        {errors.ethInput && (
          <div className="text-center font-medium my-2">
            <div>Ur a true fren but unfortunatly</div>
            <div className="text-red-500">max pool sum volume is 32.0 ETH</div>
          </div>
        )}
        <div className="mt-4 mb-8 w-full">
          <div className={`my-2 ${isDepositing || !isConnected
              ? "opacity-25"
              : "opacity-1"
            }`}>Set your ETH amount</div>
          <div className="w-full flex flex-col lg:flex-row">
            <label className="flex-1">
              <input
                disabled={isDepositing || !isConnected ? true : false}
                {...register("ethInput", { max: maxDepositValue?.toString() })}
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
                Pool
              </button>
            ) : (
              <>{!isDepositing && (
                <button
                  disabled={isDepositing ? true : false}
                  className={`btn text-white ${isDepositing
                    ? "btn-primary"
                    : "bg-gradient-to-r from-frens-blue to-frens-teal"

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
          {/* <ProgressBar progressPercentage={((poolBalance/32)*100)} />           */}
          <h2 className="text-[20px] ml-2 -mb-2 font-extrabold text-frens-gradient">{poolBalance ? poolBalance : "0"} / 32 ETH</h2>
        </div>
      </div>
    </form>
  );
};
