import Link from "next/link";
import { useState, useEffect } from "react";
import { Address } from "wagmi";
import { FrensContracts } from "utils/contracts";
import Web3 from "web3";

const deposit_address = FrensContracts.DepositContract.address

import { usePoolPubKey } from "../../hooks/read/usePoolPubKey";

type Props = {
  poolAddress: Address;
};

export const ValidatorWidget = ({ poolAddress }: Props) => {
  const { data: poolPubKey, isLoading, isSuccess } = usePoolPubKey({ address: poolAddress });



  if (isLoading)
    return <>
      Checking for validator...
    </>

  if (!isSuccess || !poolPubKey)
    return <></>

  return (
    <div className="z-20 w-11/12 md:w-2/3 border-2 border-slate-400 rounded-md bg-white mt-6">
      <div className="flex justify-center align-middle bg-white rounded-xl p-8 md:p-0 ">
        <div className="py-6 px-8 text-center md:text-left space-y-2">
          <div className="font-medium mb-2">
            <div key={poolPubKey}>
              <Link
                href={`https://prater.beaconcha.in/validator/${poolPubKey}`}
                className="underline text-frens-main"
              >
                Validator information on Beaconcha.in 📡
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
