import { usePoolOwner } from "#/hooks/read/usePoolOwner";
import Link from "next/link";
import { Address, useAccount } from "wagmi";

type Props = {
  poolAddress: Address;
  poolState: any;
};

export const PoolFullWidget = ({ poolAddress, poolState }: Props) => {
  const { address: accountAddress } = useAccount();
  const { poolOwner } = usePoolOwner({ poolAddress });

  return (
    <div className="text-center overflow-hidden rounded-xl border border-gray-200">
      <div className="flex justify-center align-middle bg-white rounded-xl p-8 md:p-0 ">
        <div className="py-6 px-8 text-center md:text-left space-y-2">
          <div className="font-medium mb-2">
            <div className="font-medium mb-2">
              <div className="text-center">🎊 This Pool is fully staked 🎊</div>
            </div>
            {poolState !== "staked" && (
              <>
                {poolOwner == accountAddress ? (
                  <div key={poolAddress} className="text-center">
                    <Link
                      href={`/run/${poolAddress}`}
                      className="underline text-frens-main"
                    >
                      Setup the validator now
                    </Link>
                  </div>
                ) : (
                  <div key={poolAddress} className="text-center">
                    Your pool operator can spin up the pool now
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
