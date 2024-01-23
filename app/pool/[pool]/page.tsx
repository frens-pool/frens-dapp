"use client";

import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Address, useBalance, useAccount } from "wagmi";
import { ValidatorWidget } from "#/components/staker/ValidatorWidget";
import Header from "components/shared/Header";
import { PoolInfo } from "components/shared/PoolInfo";
import { NftGallery } from "components/staker/NftGallery";
import { NftGraphGallery } from "components/staker/NftGraphGallery";
import { OperatorWidget } from "components/staker/OperatorWidget";
import { PoolFullWidget } from "components/staker/PoolFullWidget";
import { StakeForm } from "components/staker/StakeForm";
import { usePoolState } from "#/hooks/read/usePoolState";
import { usePoolOwner } from "#/hooks/read/usePoolOwner";
import FeeRecCheckSet from "#/components/dashboard/FeeRecCheckSet";

const Pool: NextPage = ({}) => {
  const params = useParams();
  const poolAddress = params?.pool as Address;

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
    <div>
      <Header />
      {/* Content */}
      <main className="relative -mt-32 ">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg px-5 py-6 shadow sm:px-6">
            <div className="relative isolate overflow-hidden pt-0">
              <div className="pt-6 px-4 sm:px-6 sm:pb-6 lg:px-8 ">
                {/* Pool Page */}
                <div className="grid grid-cols-1 gap-y-8">
                  <OperatorWidget
                    poolAddress={poolAddress}
                    operatorAddress={operatorAddress}
                  />

                  {poolBalance === 32 || poolState === "staked" ? (
                    <PoolFullWidget
                      poolAddress={poolAddress}
                      poolState={poolState}
                      operatorAddress={operatorAddress}
                    />
                  ) : (
                    <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                      <div className="pt-4 pb-2">
                        <StakeForm poolAddress={poolAddress} />
                        <div className="border-[0.5px] border-gray-200 rounded-md mx-4"></div>
                        <PoolInfo poolBalance={poolBalance} />
                      </div>
                    </div>
                  )}
                  {poolState === "staked" && (
                    <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                      <div className="flex justify-center align-middle bg-white rounded-xl p-0 ">
                        <div className="pt-6 pb-2 px-8 text-center md:text-middle space-y-2">
                          <ValidatorWidget poolAddress={poolAddress} />
                          <FeeRecCheckSet poolAddress={poolAddress} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                    <div className="pt-2 text-center font-bold my-2">
                      Pool shares
                    </div>
                    <div className="p-4">
                      {isConnected ? (
                        <NftGallery poolAddress={poolAddress} />
                      ) : (
                        <NftGraphGallery poolAddress={poolAddress} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pool;
