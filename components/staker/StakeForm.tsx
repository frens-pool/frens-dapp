import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Chain, useAccount, useBalance, useContractEvent, useNetwork } from "wagmi";
import { useDeposit } from "../../hooks/write/useDeposit";
import { FrensContracts } from "utils/contracts";
import { etherscanUrl } from "#/utils/externalUrls";

export const StakeForm = ({
  poolAddress,
  isDepositing,
  setIsDepositing,
  proof
}: {
  poolAddress: any;
  isDepositing: any;
  setIsDepositing: any;
  proof: string[]
}) => {
  const [maxDepositValue, setMaxDepositValue] = useState(32);
  const { chain } = useNetwork();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  const ethInputForm = watch("ethInput");
  const stakeAmount = ethInputForm > 0 ? ethInputForm.toString() : "0.1";

  const onSubmit = () => {
    if (deposit) deposit();
    setIsDepositing(true);
  };

  const { isConnected } = useAccount();
  const { data: poolBalance } = useBalance({
    address: poolAddress,
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
    error,
    prepare_error
  } = useDeposit({ address: poolAddress, val: stakeAmount, proof: proof });
  const etherscanLink = (chain: Chain, depositData: any) => `${etherscanUrl(chain)}/tx/${depositData?.hash}`;

  if (isError) setIsDepositing(false); //to handle user reject (metamask). throw react error but okay for now.

  useContractEvent({
    address: poolAddress.toString(),
    abi: FrensContracts.StakingPool.abi,
    eventName: "DepositToPool",
    listener: () => {
      setIsDepositing(false);
      reset();
      setTimeout(() => {
        router.reload();
      }, 100);
    },
  });

  const getErrorMessage = (prepare_error: any) => {
    console.dir(prepare_error)

    return prepare_error?.reason.replace("execution reverted:", "") ?? prepare_error.message

  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white">
        <div className="text-center font-bold my-2">Select amount</div>
        <label className="input-group flex justify-center">
          <input
            {...register("ethInput", { max: maxDepositValue })}
            id="ethInput"
            type="number"
            placeholder="0.1"
            step="any"
            className="input input-bordered w-1/3"
          />
          <span>ETH</span>
        </label>
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
      <div className="flex justify-center mt-2 mb-4">
        {isConnected ? (
          <div className="flex flex-col justify-center">
            <button
              disabled={isDepositing || prepare_error ? true : false}
              className={`btn text-white ${isDepositing
                ? "btn-primary"
                : "bg-gradient-to-r from-frens-blue to-frens-teal"
                }`}
              type="submit"
            >
              {isDepositing ? "Confirm in Metamask" : "Pool"}
            </button>
            {isDepositing ? (
              <div className="px-6 mb-4">
                <div className="my-2 text-center">
                  Your deposit is in process.
                </div>
                <div className="flex justify-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-frens-main"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <a
                    className="underline text-frens-main pt-1"
                    href={etherscanLink(chain!, depositData)}
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
