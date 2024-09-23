"use client";

import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useBalance } from "wagmi";
import { useParams } from "next/navigation";
import { CreateKeys } from "components/operator/CreateKeys";
import { DepositForm } from "components/operator/DepositForm";
import { Address } from "wagmi";
import Header from "#/components/shared/Header";

enum STEP {
  DEPOSIT,
}

const Operator: NextPage = () => {
  const params = useParams();
  const poolAddress = params?.pool as Address;

  const [step, setStep] = useState<STEP>(STEP.DEPOSIT);
  const [poolBalance, setPoolBalance] = useState<number>(0);

  useBalance({
    address: poolAddress,
    watch: true,
    onSuccess(data) {
      if (setPoolBalance) setPoolBalance(+data.formatted);
    },
  });

  const number = (step: STEP) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"][step];
  const className = (current_step: STEP, step: STEP) =>
    `${current_step == step ? "block" : "hidden"}`;

  if (poolAddress) {
    return (
      <div>
        <Header />
        <main className="flex flex-col justify-center items-center min-h-[93vh]">
          <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">
              {number(STEP.DEPOSIT)} Deposit ETH
            </h1>
            <div className={className(step, STEP.DEPOSIT)}>
              {/* TODO - needs fixing */}
              {/* <DepositForm
                poolAddress={poolAddress}
                nextStep={() => setStep(STEP.DEPOSIT)}
                poolBalance={poolBalance}
              /> */}
            </div>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <span className="loading loading-spinner loading-lg text-frens-main"></span>
    </div>
  );
};

export default Operator;
