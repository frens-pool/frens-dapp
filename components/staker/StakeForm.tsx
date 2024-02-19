import { useNetworkName } from "#/hooks/useNetworkName";
import { etherscanUrl } from "#/utils/externalUrls";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FrensContracts } from "utils/contracts";
import { parseEther } from "viem";
import { ethers } from "ethers";

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
      </div>
      <div className="flex justify-center mt-2 mb-4">
        {isConnected ? (
          <div className="flex flex-col justify-center">
            {prepare_error ? (
              <button
                disabled
                className="btn text-white btn-primary"
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
                  Pool
                </button>
              )}
              </>
            )}
            {isDepositing ? (
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
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>
    </form>
  );
};
