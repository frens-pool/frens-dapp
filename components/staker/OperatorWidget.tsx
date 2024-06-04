import Image from "next/image";
import { useState, useEffect } from "react";
import { Address, useEnsName, useNetwork } from "wagmi";
import { queryOperator } from "hooks/graphql/queryOperator";
import { usePoolOwner } from "../../hooks/read/usePoolOwner";
import { PoolStateVisual } from "../pool/PoolStateVisual";

// type Props = {
//   poolAddress: Address;
//   operatorAddress: Address;
//   poolBalance: number;
// };


export const OperatorWidget = ({ poolAddress, operatorAddress, poolBalance, poolState, isConnected, accountAddress }: {
  poolAddress: any;
  operatorAddress: any;
  poolBalance: any;
  poolState: any;
  isConnected: Boolean;
  accountAddress: any;
}) => {
  const [operatorENS, setOperatorENS] = useState("");
  const [operatorImage, setOperatorImage] = useState("");
  const [operatorName, setOperatorName] = useState("");

  const [accountPoolOwner, setAccountPoolOwner] = useState(false);

  const { poolOwner, isSuccess } = usePoolOwner({ poolAddress });
  const { chain } = useNetwork();
  const [showDetails, toggleShowDetails] = useState(false);



  const { data: ensName } = useEnsName({
    address: operatorAddress,
    chainId: chain?.id ?? 5,
    cacheTime: 1_000,
  });

  useEffect(() => {
    if (isConnected && (accountAddress === poolOwner)) {
      setAccountPoolOwner(true);
    }
  }, [isConnected, accountAddress]);

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
            <p className="text-[10px] uppercase text-frens-blue">Pool</p>
            <h1 className="text-[34px] font-extrabold">{poolAddress?`${poolAddress.slice(0,4)}...${poolAddress.slice(-4)}`:null}</h1>
          </div>
          <img
              className="w-5 h-5 mb-3 mx-4"
              src="/copypaste.png"
            />
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row items-start lg:items-end justify-start pt-2 flex-1">
          {accountPoolOwner?
          <div className="text-[14px] ml-3">Owned by <a className="underline" href="/">you</a></div>
          :
          <div className="text-[14px] ml-3">Owned by <a className="underline" href="/">{poolOwner?`${poolOwner.slice(0,4)}...${poolOwner.slice(-4)}`:null}</a></div>
          }
          <div className="flex-1 text-frens-blue underline font-semibold text-[14px] lg:ml-6" onClick={() => toggleShowDetails(!showDetails)}>{showDetails?"less":"more"} details</div>
          <div className="w-full lg:w-auto flex flex-col lg:flex-row">
            {/* <div className="flex flex-col items-start lg:items-end justify-start">
              <p className="text-[10px] uppercase text-frens-blue">Pool owner</p>
              <h2 className="text-[20px] mt-[5px] font-extrabold text-frens-gradient">{operatorName?operatorName:truncateAddress(operatorAddress)}</h2>
            </div> 
            <div className="flex flex-col items-start lg:items-end justify-start">
              <p className="text-[10px] uppercase text-frens-blue">In pool</p>
              <h2 className="text-[20px] mt-[5px] font-extrabold text-frens-gradient">{poolBalance ? poolBalance : "0.0"} ETH</h2>
            </div>*/}
            <div className="flex flex-col items-start lg:items-end justify-start lg:ml-10">
              <p className="text-[10px] uppercase text-frens-blue">Current rewards</p>
              {poolState === 'staked'?
                <h2 className="text-[20px] mt-[5px] font-extrabold text-frens-gradient">{poolBalance} ETH</h2>
                :
                <p className="text-[14px] font-light italic text-slate-400 mt-2">Complete setup to start staking!</p>
              }
           
            </div>
            <div className="flex flex-col items-start lg:items-end justify-start lg:ml-10">
              <p className="text-[10px] uppercase text-frens-blue">Pool status</p>
              <PoolStateVisual poolState={poolState} showDetails={()=>toggleShowDetails(!showDetails)}/>
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
