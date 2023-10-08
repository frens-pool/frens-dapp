import Image from "next/image";
import { useState, useEffect } from "react";
import { Address, useEnsName, useNetwork } from "wagmi";
import { queryOperator } from "hooks/graphql/queryOperator";
import { usePoolOwner } from "../../hooks/read/usePoolOwner";

type Props = {
  poolAddress: Address;
};

export const OperatorWidget = ({ poolAddress }: Props) => {
  const [operatorAddress, setOperatorAddress] = useState<Address>();
  const [operatorENS, setOperatorENS] = useState("");
  const [operatorImage, setOperatorImage] = useState("");
  const [operatorName, setOperatorName] = useState("");

  const { data: poolOwner, isSuccess } = usePoolOwner({ address: poolAddress });
  const { chain } = useNetwork();

  useEffect(() => {
    if (isSuccess) {
      if (poolOwner) {
        setOperatorAddress(poolOwner);
      }
    }
  }, [isSuccess, poolOwner]);

  const poolOperatorAddress = (operatorAddress: Address | undefined): Address =>
    operatorAddress
      ? operatorAddress
      : "0x49792f9cd0a7DC957CA6658B18a3c2A6d8F36F2d";

  const { data: ensName } = useEnsName({
    address: poolOperatorAddress(operatorAddress),
    chainId: chain?.id ?? 5,
    cacheTime: 1_000,
  });

  useEffect(() => {
    if (ensName && operatorAddress) {
      setOperatorENS(ensName.toString());
      fetchOperatorProfile(operatorAddress);
    }
  }, [ensName, operatorAddress]);

  const fetchOperatorProfile = async (operatorAddress: Address) => {
    const operatorProfileFromFetch = await queryOperator({
      operatorAddress: operatorAddress,
    });

    setOperatorImage(
      operatorProfileFromFetch?.data?.defaultProfile?.picture?.original?.url
    );

    setOperatorName(operatorProfileFromFetch?.data?.defaultProfile?.name);
  };

  if (operatorENS) {
    return (
      <div className="text-center overflow-hidden rounded-xl border border-gray-200">
        <div className="flex justify-center align-middle bg-white rounded-xl p-8 md:p-0 ">
          <img
            className="w-24 h-24 md:w-48 md:h-auto rounded-full"
            src={operatorImage}
            alt={operatorENS}
            width="384"
          />
          <div className="py-6 px-8 text-center md:text-left space-y-2">
            <blockquote>
              <h1 className="text-lg font-medium">Your frenly pool operator</h1>
            </blockquote>
            <div className="font-medium mb-2">
              <div className="text-frens-main">{operatorName}</div>
              <div className="text-frens-main">{ensName}</div>
            </div>
            {/* <button onClick={follow}>Follow on Lens</button> */}
            {ensName && (
              <a
                href={
                  "https://lenster.xyz/u/" +
                  ensName.replace(new RegExp(".eth$"), ".lens")
                }
                target="_blank"
                rel="noopener noreferrer"
                className="py-2"
              >
                Follow on Lens
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="text-center overflow-hidden rounded-xl border border-gray-200">
      <div className="flex flex-wrap justify-center align-middle bg-white rounded-xl p-4 md:p-8">
        <div className="flex justify-center p-2 mr-6">
          <Image
            src="/FRENS-logo-coloured.png"
            alt="FRENS logo"
            width="76"
            height="48"
          />
        </div>

        <div className="pt-0 md:pt-6 pr-0 md:pr-8 text-center md:text-left space-y-4">
          <blockquote>
            <h1 className="text-lg">Your frenly pool operator</h1>
          </blockquote>
          <div className="">
            <div className="text-frens-main ">no ENS</div>
            <div className="hidden md:block">
              <div className="mb-4">
                {operatorAddress
                  ? operatorAddress
                  : "couldn't query operator address"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
