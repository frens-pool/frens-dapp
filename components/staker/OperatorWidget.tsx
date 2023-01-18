import { useState, useEffect } from "react";
import { useEnsName } from "wagmi";
import { queryOperator } from "hooks/graphql/queryOperator";
import { usePoolOwner } from "../../hooks/read/usePoolOwner";

const chainId = 5; // 1 for mainnet, 5 for goerli

type Props = {
  poolAddress: string;
};

export const OperatorWidget = ({ poolAddress }: Props) => {
  const [operatorAddress, setOperatorAddress] = useState("");
  const [operatorENS, setOperatorENS] = useState("");
  const [operatorImage, setOperatorImage] = useState("");
  const [operatorName, setOperatorName] = useState("");

  const { data: poolOwner, isSuccess } = usePoolOwner({ address: poolAddress });
  useEffect(() => {
    if (isSuccess) {
      if (poolOwner) {
        setOperatorAddress(poolOwner.toString());
      }
    }
  }, [isSuccess, poolOwner]);

  const poolOperatorAddress = (operatorAddress: string): `0x${string}` =>
    operatorAddress
      ? `0x${operatorAddress.toString().slice(2)}`
      : "0x49792f9cd0a7DC957CA6658B18a3c2A6d8F36F2d";

  const { data: ensName } = useEnsName({
    address: poolOperatorAddress(operatorAddress),
    chainId: chainId,
    cacheTime: 1_000,
  });

  useEffect(() => {
    if (ensName) {
      setOperatorENS(ensName.toString());
      fetchOperatorProfile();
    }
  }, [ensName, operatorENS]);

  const fetchOperatorProfile = async () => {
    let operatorProfileFromFetch = await queryOperator({
      operatorAddress: operatorAddress.toString(),
    });
    console.log("operatorProfileFromFetch");
    console.log(operatorProfileFromFetch);
    // @ts-ignore
    setOperatorImage(
      operatorProfileFromFetch?.data?.defaultProfile?.picture?.original?.url
    );
    // @ts-ignore
    setOperatorName(operatorProfileFromFetch?.data?.defaultProfile?.name);
  };

  if (operatorENS) {
    return (
      <div className="w-full md:w-3/5 mt-4">
        <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
          <img
            className="w-24 h-24 md:w-48 md:h-auto rounded-full mx-auto"
            src={operatorImage}
            alt={operatorENS}
            width="384"
          />
          <div className="py-6 px-8 text-center md:text-left space-y-4">
            <blockquote>
              <h1 className="text-lg font-medium text-white">
                Your frenly pool operator
              </h1>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-sky-500 dark:text-sky-400">
                {operatorName}
              </div>
              <div className="text-sky-500 dark:text-sky-400">{ensName}</div>
              <div className="text-white dark:text-slate-500"></div>
            </figcaption>
            {/* <button onClick={follow}>Follow on Lens</button> */}
            {ensName && (
              <a
                href={
                  "https://lenster.xyz/u/" +
                  ensName.replace(new RegExp(".eth$"), ".lens")
                }
              >
                Follow on Lens
              </a>
            )}
          </div>
        </figure>
      </div>
    );
  }

  return (
    <div className="w-3/5 my-4">
      <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <div className="text-3xl text-white text-center p-2 md:p-14">🧑‍🤝‍🧑</div>
        <div className="pt-2 md:pt-6 pr-0 md:pr-8 text-center md:text-left space-y-4">
          <blockquote>
            <h1 className="text-lg font-medium text-white">
              Your frenly pool operator
            </h1>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">no ENS</div>
            <div className="hidden md:block text-white dark:text-white">
              <div>
                {operatorAddress
                  ? operatorAddress
                  : "couldn't query operator address"}
              </div>
            </div>
          </figcaption>
          :{" "}
        </div>
      </figure>
    </div>
  );
};
