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
    <div className="w-full flex flex-col items-start justify-start px-6 lg:px-[1.5vw] pb-6 border-b-[1px] border-dashed border-slate-300">
    <p className="text-[10px] uppercase text-black mb-[4px]">External links</p>
          <Link
            key={`beaconchain-${poolPubKey}`}
            href={`${beaconchainUrl(chain)}/validator/${poolPubKey}`}
            className="underline text-[14px] font-semibold mb-2"
          >
          📡 Validator on Beaconcha.in 
          </Link>
          <Link
            key={`ssv-explorer-${poolPubKey}`}
            href={ssvExplorer(poolPubKey, chain)}
            className="underline font-semibold"
          >
            📡 Validator on ssv.network explorer
          </Link>
    </div>
  );
};
