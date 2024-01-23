import { Address, useNetwork, useWaitForTransaction } from "wagmi";
import { useClaimReward } from "../../hooks/write/useClaimReward";
import { etherscanUrl } from "#/utils/externalUrls";

interface ClaimReward {
  poolAddress: Address;
  nftID: string;
  claimable: number;
}

function ClaimReward({ poolAddress, nftID, claimable }: ClaimReward) {
  const { data, write: claimReward } = useClaimReward({ poolAddress, nftID });

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });
  const { chain } = useNetwork();

  if (isLoading) {
    const etherscanLink = `${etherscanUrl(chain)}/tx/${data?.hash}`;
    return (
      <div>
        <div className="flex items-center justify-center mt-4 mb-2">
          <div>
            <div className="my-2">claiming rewards</div>
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
    <button
      className="mb-2 btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
      onClick={() => {
        claimReward && claimReward();
      }}
    >
      Claim reward ({claimable} ETH)
    </button>
  );
}

export default ClaimReward;
