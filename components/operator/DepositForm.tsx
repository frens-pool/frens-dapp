import { Address, useBalance, useNetwork, useWaitForTransaction } from "wagmi";
import { useStake } from "../../hooks/write/useStake";
import { etherscanUrl } from "#/utils/externalUrls";

interface DepositFormProps {
  poolAddress: Address;
  nextStep: () => void;
  poolBalance: number;
}

export const DepositForm = ({
  nextStep,
  poolAddress,
  poolBalance,
}: DepositFormProps) => {
  const { data, write: stake } = useStake({ poolAddress });
  const { chain } = useNetwork();
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      nextStep();
    },
  });

  return (
    <div className="w-2/5 mx-auto my-2 p-2">
      {poolBalance >= 32 ? (
        <div>
          <div>You are ready to deposit</div>
          <div>
            <button
              className={`${
                isLoading
                  ? "btn btn-info no-animation my-2 mr-2 loading"
                  : "btn bg-gradient-to-r from-frens-blue to-frens-teal text-white mb-2"
              }`}
              onClick={() => {
                if (stake) stake();
              }}
              disabled={isLoading}
            >
              {isLoading
                ? "Deposit in progress..."
                : "Deposit ETH to Beacon chain"}
            </button>
            {isLoading && (
              <div className="my-2">
                <a
                  href={`${etherscanUrl(chain)}/tx/${data?.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-frens-main underline px-2"
                >
                  tx on Etherscan
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="text-orange-400">Pool 32 ETH first</div>
          <button className="btn btn-primary mb-2" disabled>
            Deposit ETH to Beacon chain
          </button>
        </div>
      )}
      {/* {nextStep && (
        <button
          className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
          onClick={() => {
            nextStep!();
          }}
        >
          Next
        </button>
      )} */}
    </div>
  );
};
