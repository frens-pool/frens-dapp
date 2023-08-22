import Link from "next/link";
import { Address, useNetwork } from "wagmi";
import { beaconchainUrl, ssvExplorer } from "#/utils/externalUrls";
import { usePoolPubKey } from "../../hooks/read/usePoolPubKey";

type Props = {
  poolAddress: Address;
};

export const ValidatorWidget = ({ poolAddress }: Props) => {
  const {
    data: poolPubKey,
    isLoading,
    isSuccess,
  } = usePoolPubKey({ address: poolAddress });
  const { chain } = useNetwork();

  if (isLoading) return <>Checking for validator...</>;

  if (!isSuccess || !poolPubKey) return <></>;

  return (
    <div className="z-20 w-11/12 md:w-2/3 border-2 border-slate-400 rounded-md bg-white mt-6">
      <div className="flex justify-center align-middle bg-white rounded-xl p-8 md:p-0 ">
        <div className="py-6 px-8 text-center md:text-middle space-y-2">
          <div className="font-medium mb-2">
            <div key={`beaconchain-${poolPubKey}`}>
              <Link
                href={`${beaconchainUrl(chain)}/validator/${poolPubKey}`}
                className="underline text-frens-main"
              >
                Validator information on Beaconcha.in 📡
              </Link>
            </div>
          </div>
          <div className="font-medium mb-2">
            <div key={`ssv-explorer-${poolPubKey}`}>
              <Link
                href={ssvExplorer(poolPubKey, chain)}
                className="underline text-frens-main"
              >
                Validator information on ssv.network explorer 🧭
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
