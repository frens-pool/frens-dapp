import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import { CreateKeys } from "components/operator/CreateKeys";
import { DepositForm } from "components/operator/DepositForm";
import { Address } from "wagmi";

const Operator: NextPage = () => {
  const router = useRouter();
  const poolAddress = router.query.pool as Address; //FIXME: better error handling

  enum STEP {
    DEPOSIT,
  }
  const [step, setStep] = useState<STEP>(STEP.DEPOSIT);

  const number = (step: STEP) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"][step];
  const className = (current_step: STEP, step: STEP) =>
    `${current_step == step ? "block" : "hidden"}`;

  if (poolAddress) {
    return (
      <div className="" data-theme="winter">
        <Head>
          <title>FRENS Pool: Solo validator</title>
          <meta name="description" content="stake with friends" />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤙</text></svg>"
          />
        </Head>

        <Navbar />

        <main className="flex flex-col justify-center items-center min-h-[93vh]">
          <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">
              {number(STEP.DEPOSIT)} Deposit ETH
            </h1>
            <div className={className(step, STEP.DEPOSIT)}>
              <DepositForm
                poolAddress={poolAddress}
                nextStep={() => setStep(STEP.DEPOSIT)}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return <div>loading animation!</div>;
};

export default Operator;
