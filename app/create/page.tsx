"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { Address } from "wagmi";
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
      <main className="py-[120px] px-[8vw] bg-gradient-to-r from-[#3211C8] from-0% to-[#437CEA] to-100%">
          <h1 className="text-[50px] font-extrabold text-white">
          Create a pool
          </h1>
          <p className="max-w-[640px] font-normal text-white text-[22px]">Are you ready to start pooling ETH together with your frens? Let's jump in!</p> 
          <div className="my-32">
            <CreatePool
              onFinish={() => setStep("Invite")}
              setPoolContract={setPoolContract}
            />
          </div>

                {/* <div className="text-center overflow-hidden rounded-xl border border-gray-200">
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
                </div> */}
      </main>
  );
};

export default Create;
