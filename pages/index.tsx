import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import { InviteFrens } from "components/operator/InviteFrens";
import { CreatePool } from "components/operator/CreatePool";
import { RunValidator } from "components/operator/RunValidator";
import { Address, useBalance } from "wagmi";
import { usePoolPubKey } from "#/hooks/read/usePoolPubKey";

const STEPS = ["Create", "Invite", "Run", "Ready"] as const;
export type STEP_TYPE = (typeof STEPS)[number];

const Operator: NextPage = () => {
  const number = (step: STEP_TYPE) =>
    ["1️⃣", "2️⃣", "3️⃣", "4️⃣"][STEPS.indexOf(step)];

  const poolAddress = useRouter().query["pool"];
  const [poolContract, setPoolContract] = useState<Address>("0x");
  const [step, setStep] = useState<STEP_TYPE>("Create");

  const { isSuccess: poolPubKeySuccess, data: poolPubKey } = usePoolPubKey({
    address: poolContract,
  });

  useEffect(() => {
    if (poolAddress) {
      setPoolContract(poolAddress as Address);
    }
  }, [poolAddress]);

  //auto-advance if poolPubKey is already set
  const { data: poolBalance } = useBalance({
    address: poolContract as Address,
  });

  useEffect(() => {
    const poolBalanceNumber: number = poolBalance
      ? +poolBalance.formatted
      : 0.0;
    if (poolBalanceNumber >= 32) {
      setStep("Run");
    } else if (poolPubKeySuccess && poolPubKey != "0x") {
      setStep("Invite");
    } else if (poolContract != "0x") {
      setStep("Invite");
    } else {
      setStep("Create");
    }
  }, [poolAddress, poolBalance, poolPubKey, poolPubKeySuccess, poolContract]);

  const className = (current_step: STEP_TYPE, step: STEP_TYPE) =>
    `${current_step == step ? "block" : "hidden"}`;

  return (
    <div
      className="bg-gradient-to-r from-cyan-50 to-blue-50"
      data-theme="winter"
    >
      <Head>
        <title>FRENS Pool</title>
        <meta name="description" content="stake with friends" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤙</text></svg>"
        />
      </Head>

      <Navbar />

      <main className="flex flex-col justify-center items-center min-h-[93vh]">
        <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">{number("Create")} Create Pool</h1>
          <div className={className(step, "Create")}>
            <CreatePool
              onFinish={() => setStep("Invite")}
              setPoolContract={setPoolContract}
            />
          </div>
        </div>
        <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">
            {number("Invite")} Invite Friends
          </h1>
          <div
            className={`${step == "Invite" || step == "Run" ? "block" : "hidden"
              }`}
          >
            <InviteFrens
              poolContract={poolContract}
              onFinish={() => setStep("Run")}
              current_step={step}
            />
          </div>
        </div>
        <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">{number("Run")} Run Validator</h1>
          <div className={className(step, "Run")}>
            <RunValidator poolContract={poolContract} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Operator;
