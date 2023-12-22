"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { Address } from "wagmi";
import Header from "components/shared/Header";
import { InviteFrens } from "components/operator/InviteFrens";
import { CreatePool } from "components/operator/CreatePool";

const STEPS = ["Create", "Invite", "Ready"] as const;
export type STEP_TYPE = (typeof STEPS)[number];

const Create: NextPage = () => {
  const number = (step: STEP_TYPE) => ["1️⃣", "2️⃣", "3️⃣"][STEPS.indexOf(step)];

  const params = useParams();
  const poolAddress = params?.pool as Address;

  const [poolContract, setPoolContract] = useState<Address>("0x");
  const [step, setStep] = useState<STEP_TYPE>("Create");

  useEffect(() => {
    if (poolAddress) {
      setPoolContract(poolAddress as Address);
    }
  }, [poolAddress]);

  useEffect(() => {
    if (poolContract != "0x") {
      setStep("Invite");
    } else {
      setStep("Create");
    }
  }, [poolAddress, poolContract]);

  const className = (current_step: STEP_TYPE, step: STEP_TYPE) =>
    `${current_step == step ? "block" : "hidden"}`;

  return (
    <div>
      <Header />
      {/* Content */}
      <main className="relative -mt-32 ">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="bg-white min-h-[60vh] rounded-lg py-6 shadow px-4 sm:px-6 lg:px-16">
            <div className="relative isolate overflow-hidden pt-0">
              <div className="pt-6 pb-4 mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                  Fuel your ETH staking in two easy steps
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-y-8">
                <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                  <div className="flex items-center justify-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                    <div className="text-2xl font-medium leading-6 text-gray-900">
                      {number("Create")} Create Pool
                    </div>
                  </div>
                  <dl className="-my-3 divide-y divide-gray-100 px-6 text-sm leading-6">
                    <div className={className(step, "Create")}>
                      <div className="pt-4 pb-6">
                        <CreatePool
                          onFinish={() => setStep("Invite")}
                          setPoolContract={setPoolContract}
                        />
                      </div>
                    </div>
                  </dl>
                </div>
                <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                  <div className="flex items-center justify-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                    <div className="text-2xl font-medium leading-6 text-gray-900">
                      {number("Invite")} Invite Friends
                    </div>
                  </div>
                  <dl className="-my-3 divide-y divide-gray-100 px-6  text-sm leading-6">
                    <div
                      className={`${
                        step == "Invite" || step == "Ready"
                          ? "block pt-4 pb-6"
                          : "hidden"
                      }`}
                    >
                      <InviteFrens
                        poolContract={poolContract}
                        onFinish={() => setStep("Ready")}
                        current_step={step}
                      />
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
