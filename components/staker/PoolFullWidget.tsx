import Link from "next/link";
import { Address, useNetwork } from "wagmi";

type Props = {
  poolAddress: Address;
  poolState: any;
};

export const PoolFullWidget = ({ poolAddress, poolState }: Props) => {
  return (
    <div className="z-20 w-11/12 md:w-2/3 border-2 border-slate-400 rounded-md bg-white mt-6">
      <div className="flex justify-center align-middle bg-white rounded-xl p-8 md:p-0 ">
        <div className="py-6 px-8 text-center md:text-left space-y-2">
          <div className="font-medium mb-2">
            <div className="font-medium mb-2">
              <div className="text-center">🎊 This Pool is fully staked 🎊</div>
            </div>
            {poolState !== "staked" && (
              <div key={poolAddress} className="text-center">
                <Link
                  href={`/run/${poolAddress}`}
                  className="underline text-frens-main"
                >
                  Setup the validator now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
