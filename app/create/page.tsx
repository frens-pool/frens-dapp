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
    <main className="flex flex-col items-start justify-start bg-gradient-to-r from-[#3211C8] from-0% to-[#437CEA] to-100%">
      {step == "Invite" || step == "Ready" ? (
        <div className="py-[90px] lg:py-[120px] px-[10vw] lg:px-[8vw]">
          <h1 className="text-[40px] lg:text-[50px] font-extrabold text-frens-teal">
            Woohoow!
          </h1>
          <div className="flex flex-col lg:flex-row items-center justify-start">
            <p className="max-w-[640px] font-bold text-white text-[22px]">
              Your pool was succesfully created!
            </p>
            <img
              className="w-[17px] h-[11px] opacity-1 ml-4"
              src="/checkmark.png"
            />
          </div>
          <p className="max-w-[640px] font-normal text-white text-[22px]">
            Here is your new pool:
          </p>

          <div className="mt-16">
            <InviteFrens
              poolContract={poolContract}
              onFinish={() => setStep("Ready")}
              current_step={step}
            />
          </div>
          <div className="text-white font-light text-[16px] leading-[30px] mt-20">
            <p>So far so good, fren! All that&apos;s left now is:</p>
            <ul>
              <li>• complete the setup (on your pool&apos;s page)</li>
              <li>• invite your frens!</li>
            </ul>
            <br />
            <p>
              So get those swimsuits out, and let&apos;s have a (pool) party!
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full pb-[90px] lg:pb-[120px]">
          <div className="py-[90px] lg:py-[120px] px-[10vw] lg:px-[8vw]">
            <h1 className="text-[40px] lg:text-[50px] font-extrabold text-white">
              Create a pool
            </h1>
            <p className="max-w-[640px] font-normal text-white text-[20px] lg:text-[22px]">
              Are you ready to start pooling ETH together with your frens?
              Let&apos;s jump in!
            </p>
            <div className="mt-20 lg:mt-32">
              <CreatePool
                onFinish={() => setStep("Invite")}
                setPoolContract={setPoolContract}
              />
            </div>
          </div>
          <div className="px-[8vw] pt-8 border-t-[1px] border-frens-teal text-frens-teal">
            A little hesitant? Dip your toes in the{" "}
            <a
              className="underline"
              href="https://docs.frens.fun/docs/manifesto"
              rel="noopener noreferrer"
            >
              docs
            </a>{" "}
            to learn more!
          </div>
        </div>
      )}
    </main>
  );
};

export default Create;
