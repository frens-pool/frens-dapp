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
    <div>
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
  );
};
