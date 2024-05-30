"use client";

import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Address, useAccount, useBalance, useNetwork } from "wagmi";
import { ValidatorWidget } from "#/components/staker/ValidatorWidget";
import { PoolInfo } from "components/shared/PoolInfo";
import { NftGallery } from "components/staker/NftGallery";
import { NftGraphGallery } from "components/staker/NftGraphGallery";
import { OperatorWidget } from "components/staker/OperatorWidget";
import { PoolFullWidget } from "components/staker/PoolFullWidget";
import { StakeForm } from "components/staker/StakeForm";
import { usePoolState } from "#/hooks/read/usePoolState";
import { usePoolOwner } from "#/hooks/read/usePoolOwner";
import FeeRecCheckSet from "#/components/dashboard/FeeRecCheckSet";
import PoolSSVBalance from "#/components/dashboard/PoolSSVBalance";
import { PoolSetup } from "#/components/pool/PoolSetup";


const Pool: NextPage = ({}) => {
  const params = useParams();
  const poolAddress = params?.pool as Address;
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { data: poolState } = usePoolState({ poolAddress });
  const [poolBalance, setPoolBalance] = useState<number>(0);

  useBalance({
    address: poolAddress,
    watch: true,
    onSuccess(data) {
      if (setPoolBalance) setPoolBalance(+data.formatted);
    },
  });

  const [operatorAddress, setOperatorAddress] = useState<Address>(
    "0x49792f9cd0a7DC957CA6658B18a3c2A6d8F36F2d"
  ); //default
  const { poolOwner, isSuccess } = usePoolOwner({
    poolAddress: poolAddress,
  });

  useEffect(() => {
    if (isSuccess) {
      if (poolOwner) {
        setOperatorAddress(poolOwner);
      }
    }
  }, [isSuccess, poolOwner]);

  return (
        <main className="w-full">
          <OperatorWidget
            poolAddress={poolAddress}
            operatorAddress={operatorAddress}
            poolBalance={poolBalance}
          />
            <PoolSetup
            chain={chain}
            poolAddress={poolAddress}
            poolState={poolState}
            poolOwner={poolOwner} />

            <div className="w-full px-[8vw] pt-8 flex flex-col items-start justify-start">
              <p className="text-[10px] uppercase text-frens-purple">Pool stakes</p>
              <div className="w-full flex flex-row items-start justify-start">
              {poolBalance !== 32 || poolState !== "staked" && (
                <div className="w-full max-w-[755px]">
                <StakeForm poolAddress={poolAddress} />
                </div>
              )}
              {isConnected ? (
                <NftGallery poolAddress={poolAddress} />
              ) : (
                <NftGraphGallery poolAddress={poolAddress} />
              )}
              </div>
            </div>



          {poolState === "staked" && (
            <div className="text-center overflow-hidden rounded-xl border border-gray-200">
              <div className="flex justify-center align-middle bg-white rounded-xl p-0 ">
                <div className="pt-6 pb-2 px-8 text-center md:text-middle space-y-2">
                  <ValidatorWidget poolAddress={poolAddress} />
                  <FeeRecCheckSet poolAddress={poolAddress} />
                  <PoolSSVBalance poolAddress={poolAddress}/>
                </div>
              </div>
            </div>
          )}
          {/* <div className="w-full flex flex-col items-start justify-start px-8">

            <div className="p-4">
              {isConnected ? (
                <NftGallery poolAddress={poolAddress} />
              ) : (
                <NftGraphGallery poolAddress={poolAddress} />
              )}
            </div>
          </div> */}

        </main>
  );
};

export default Pool;
