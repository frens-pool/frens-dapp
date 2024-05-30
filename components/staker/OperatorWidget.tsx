import Image from "next/image";
import { useState, useEffect } from "react";
import { Address, useEnsName, useNetwork } from "wagmi";
import { queryOperator } from "hooks/graphql/queryOperator";
import { usePoolOwner } from "../../hooks/read/usePoolOwner";

type Props = {
  poolAddress: Address;
  operatorAddress: Address;
  poolBalance: number;
};

export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 5)}...${addr.slice(-3)}`;

export const OperatorWidget = ({ poolAddress, operatorAddress, poolBalance }: Props) => {
  const [operatorENS, setOperatorENS] = useState("");
  const [operatorImage, setOperatorImage] = useState("");
  const [operatorName, setOperatorName] = useState("");

  const { poolOwner, isSuccess } = usePoolOwner({ poolAddress });
  const { chain } = useNetwork();
  const [showDetails, toggleShowDetails] = useState(false);



  const { data: ensName } = useEnsName({
    address: operatorAddress,
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

  // if (operatorENS) {
  //   return (
  //     <div className="text-center overflow-hidden rounded-xl border border-gray-200">
  //       <div className="flex justify-center align-middle bg-white rounded-xl p-8 md:p-0 ">
  //         <img
  //           className="w-24 h-24 md:w-48 md:h-auto rounded-full"
  //           src={operatorImage}
  //           alt={operatorENS}
  //           width="384"
  //         />
  //         <div className="py-6 px-8 text-center md:text-left space-y-2">
  //           <blockquote>
  //             <h1 className="text-lg font-medium">Your frenly pool operator</h1>
  //           </blockquote>
  //           <div className="font-medium mb-2">
  //             <div className="text-frens-main">{operatorName}</div>
  //             <div className="text-frens-main">{ensName}</div>
  //           </div>
  //           {/* <button onClick={follow}>Follow on Lens</button> */}
  //           {ensName && (
  //             <a
  //               href={
  //                 "https://lenster.xyz/u/" +
  //                 ensName.replace(new RegExp(".eth$"), ".lens")
  //               }
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="py-2"
  //             >
  //               Follow on Lens
  //             </a>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="w-full flex-col items-center justify-center border-b-[1px] border-frens-blue border-dashed">
      <div className="w-full flex flex-col lg:flex-row items-start justify-center px-[8vw] pt-24 pb-7">
        <div className="flex flex-row items-end justify-start">
          <div className="flex flex-col items-start justify-start">
            <p className="text-[10px] uppercase text-frens-purple">Pool</p>
            <h1 className="text-[34px] font-extrabold">{truncateAddress(poolAddress)}</h1>
          </div>
          <img
              className="w-5 h-5 mb-3 mx-4"
              src="/copypaste.png"
            />
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row items-start lg:items-end justify-start pt-2 flex-1">
          <div className="flex-1 text-frens-blue underline font-extrabold text-[12px]" onClick={() => toggleShowDetails(!showDetails)}>{showDetails?"hide":"show"} details</div>
          <div className="w-full lg:w-auto grid grid-cols-2 gap-2 lg:gap-12 lg:grid-cols-4">
            <div className="flex flex-col items-start justify-start">
              <p className="text-[10px] uppercase text-frens-purple">Pool owner</p>
              <h2 className="text-[20px] mt-[5px] font-bold text-black">{operatorName?operatorName:truncateAddress(operatorAddress)}</h2>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-[10px] uppercase text-frens-purple">In pool</p>
              <h2 className="text-[20px] mt-[5px] font-extrabold bg-gradient-to-r from-frens-blue to-[#223089] inline-block text-transparent bg-clip-text">{poolBalance ? poolBalance : "0.0"} ETH</h2>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-[10px] uppercase text-frens-purple">Current rewards total</p>
              <h2 className={poolBalance === 32 ?
                              "text-[20px] mt-[5px] font-extrabold bg-gradient-to-r from-frens-blue to-[#223089] inline-block text-transparent bg-clip-text"
                              :"text-[20px] mt-[5px] font-extrabold bg-gradient-to-r from-frens-blue to-[#223089] inline-block text-transparent bg-clip-text opacity-[25%]"}>0.0 ETH</h2>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-[10px] uppercase text-frens-purple">Pool status</p>
              <div className="border-[1px] border-frens-teal mt-[4px] px-2">
                <p className="text-[16px]">great! 🤙</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDetails &&
        <div>yallow!</div>
      }

      {/* <div className="flex flex-wrap justify-center align-middle bg-white rounded-xl p-4 md:p-8">

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
      </div> */}
      
    </div>
  );
};
