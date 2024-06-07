"use client";

import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address, useAccount, useBalance, useNetwork } from "wagmi";

import Header from "components/shared/Header";
import { SelectOperator } from "components/operator/SelectOperator";
import { SSVRegisterValidator } from "components/operator/SsvRegisterValidator";
import { SplitKeyshares } from "#/components/operator/SplitKeyshares";
import { PoolStatus } from "#/components/operator/PoolStatus";
import { usePoolState } from "#/hooks/read/usePoolState";
import { usePoolOwner } from "#/hooks/read/usePoolOwner";
import { usePoolPubKey } from "#/hooks/read/usePoolPubKey";

enum STEP {
  REMOVE_VALIDATOR,
  SELECT_OPERATOR,
  KEYSTORE_FORM,
  SSV_REGISTER,
  DONE,
}

const RunPool: NextPage = () => {
  const params = useParams();
  const poolAddress = params?.pool as Address;
  const { chain } = useNetwork();
  const { data: poolState } = usePoolState({ poolAddress });
  const { poolOwner } = usePoolOwner({ poolAddress });
  const { isConnected, address: connectedAddress } = useAccount();
  const { data: poolPubKey } = usePoolPubKey({ address: poolAddress });

  const [ssvValidator, setssvValidator] = useState<any>();
  const [poolBalance, setPoolBalance] = useState<number>(0);
  const [step, setStep] = useState(STEP.SELECT_OPERATOR);
  // const [step, setStep] = useState(STEP.SELECT_OPERATOR);
  const [pubKey, setPubKey] = useState("");
  const [operators, setOperators] = useState();
  const [payloadRegisterValidator, setPayloadRegisterValidator] = useState();

  const number = (step: STEP) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣"][step];
  const className = (current_step: STEP, step: STEP) =>
    `${current_step == step ? "block" : "hidden"}`;

  useBalance({
    address: poolAddress,
    onSuccess(data) {
      if (setPoolBalance) setPoolBalance(+data.formatted);
    },
  });

  useEffect(() => {
    if (poolState === "staked") {
      setStep(STEP.SELECT_OPERATOR);
    }
  }, [poolAddress]);

  // useEffect(() => {
  //   if (poolState === "staked" && poolPubKey) {
  //     const fetchSsvValidator = async () => {
  //       const response = await fetch(ssvValidatorApi(poolPubKey, chain));
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       } else {
  //         const data = await response.json();
  //         setssvValidator(data);
  //         if (data) {
  //           setStep(STEP.DONE);
  //         }
  //       }
  //     };
  //     fetchSsvValidator().catch(console.error);
  //   }
  // }, [poolState]);

  const updatePubKeyState = (newValue: any) => {
    setPubKey(newValue);
  };

  if (isConnected && poolOwner === connectedAddress) {
    return (
      <div>
        <Header />
        {/* Content */}
        <main className="relative -mt-32 ">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg px-5 py-6 shadow sm:px-6">
              <div className="relative isolate overflow-hidden pt-0">
                <div className="pt-6 px-4 sm:px-6 sm:pb-6 lg:px-8 ">
                  {/* Describtion */}
                  <div className="pb-4 mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                    <h1 className="text-base font-semibold leading-7 text-gray-900">
                      Change cluster STEP: {step}
                    </h1>
                  </div>
                  {/* Dev purpose */}
                  <PoolStatus
                    poolAddress={poolAddress}
                    poolState={poolState}
                    poolOwner={poolOwner}
                    poolBalance={poolBalance}
                    connectedAddress={connectedAddress!}
                    ssvValidator={ssvValidator}
                  />
                  {/* Run Content */}
                  <div className="grid grid-cols-1 gap-y-8">
                    {/* Step 1 */}
                    <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                      <div className="flex items-center justify-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <div className="text-2xl font-medium leading-6 text-gray-900">
                          {number(STEP.SELECT_OPERATOR)} select four operators
                        </div>
                      </div>
                      <dl className="-my-3 divide-y divide-gray-100 px-6  text-sm leading-6">
                        <div className={className(step, STEP.SELECT_OPERATOR)}>
                          <SelectOperator
                            nextStep={() => setStep(STEP.KEYSTORE_FORM)}
                            setOperators={setOperators}
                          />
                        </div>
                      </dl>
                    </div>
                    {/* Step 2 */}
                    <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                      <div className="flex items-center justify-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <div className="text-2xl font-medium leading-6 text-gray-900">
                          {number(STEP.KEYSTORE_FORM)} split keyshare
                        </div>
                      </div>
                      <dl className="-my-3 divide-y divide-gray-100 px-6  text-sm leading-6">
                        <div className={className(step, STEP.KEYSTORE_FORM)}>
                          <SplitKeyshares
                            nextStep={() => setStep(STEP.SSV_REGISTER)}
                            operatorsList={operators}
                            setPayloadRegisterValidator={
                              setPayloadRegisterValidator
                            }
                            poolAddress={poolAddress}
                          />
                        </div>
                      </dl>
                    </div>
                    {/* Step 3 */}
                    <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                      <div className="flex items-center justify-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <div className="text-2xl font-medium leading-6 text-gray-900">
                          {number(STEP.SSV_REGISTER)} assign new cluster
                        </div>
                      </div>
                      <dl className="-my-3 divide-y divide-gray-100 px-6  text-sm leading-6">
                        <div className={className(step, STEP.SSV_REGISTER)}>
                          <SSVRegisterValidator
                            poolAddress={poolAddress}
                            operators={operators}
                            payloadData={payloadRegisterValidator}
                          />
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="bg-white" data-theme="winter">
      <Header />
      <main className="relative -mt-32 ">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center rounded-lg py-6 shadow px-4 sm:px-6 lg:px-16">
            <div>Connect pool owner wallet to run a validator</div>
            {/* <div>Pool owner is: {poolOwner}</div> */}
            <div className="mt-6">
              <ConnectButton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RunPool;
