import { useNetworkName } from "#/hooks/useNetworkName";
import { etherscanUrl } from "#/utils/externalUrls";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FrensContracts } from "utils/contracts";
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
}

export const StakeForm = ({ poolAddress }: Props) => {
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
    <form className="blue-to-purple text-white p-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col items-start justify-start">
        <h2 className="font-bold text-[30px]">Wanna pool together?</h2>
        <div className="my-2">Set your ETH amount</div>
        <div className="w-full flex flex-col lg:flex-row ">
          <label className="flex-1">
            <input
              {...register("ethInput", { max: maxDepositValue })}
              id="ethInput"
              type="number"
              placeholder="0.1"
              min="0"
              step="any"
              className="w-full max-w-[400px] lg:mr-4 input bg-transparent input-bordered border-[rgba(255,255,255,0.5)] focus:border-white"
            />
          </label>
          {prepare_error ? (
            <button
              disabled
              className="btn-medium bg-white text-frens-blue"
              type="submit"
            >
              Stake
            </button>
          ) : (
            <>{!isDepositing && (
              <button
                disabled={isDepositing ? true : false}
                className={`btn-medium bg-white text-frens-blue ${isDepositing
                    ? "opacity-5"
                    : "opacity-1"
                  }`}
                type="submit"
              >
                join pool
              </button>
            )}
            </>
          )}            
        </div>
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
      </div>
      <div className="flex justify-center mt-2 mb-4">
      {isDepositing &&
              <div className="px-6 mb-4">
                <div className="my-2 text-center">
                  Your deposit is in process
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
              </div>}
        {isConnected ? (
          <></>
        ) : (
          <p>Please connect your web3 wallet to stake this pool</p>
          // <ConnectButton />
        )}
      </div>
    </form>
  );
};
