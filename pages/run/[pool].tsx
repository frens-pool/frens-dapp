import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import { SelectOperator } from "components/operator/SelectOperator";
import { SSVRegisterValidator } from "components/operator/SsvRegisterValidator";
import { PoolInfo } from "components/shared/PoolInfo";
import { KeystoreForm } from "components/operator/KeystoreForm";
import { StepIndicator } from "components/operator/StepIndicator";
import { CreateKeys } from "components/operator/CreateKeys";
import { DepositForm } from "components/operator/DepositForm";

const Operator: NextPage = () => {
  const router = useRouter();
  const poolAddress = router.query.pool as string;

  const [step, setStep] = useState(2);
  const [payloadRegisterValidator, setPayloadRegisterValidator] = useState();

  if (poolAddress) {
    return (
      <div
        className="bg-gradient-to-r from-cyan-400 to-blue-300"
        data-theme="winter"
      >
        <Head>
          <title>FRENS Pool </title>
          <meta name="description" content="stake eth via ur trusted degen" />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>"
          />
        </Head>

        <Navbar />

        <main className="flex flex-col justify-center items-center min-h-[93vh]">
          <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">Run SSV-validator</h1>
            <StepIndicator step={step} />
            <div className={`${step == 1 ? "block" : "hidden"}`}>
              <CreateKeys setStep={setStep} poolAddress={poolAddress} />
            </div>
            <div className={`${step == 2 ? "block" : "hidden"}`}>
              <DepositForm setStep={setStep} poolAddress={poolAddress} />
            </div>
            <div className={`${step == 3 ? "block" : "hidden"}`}>
              <SelectOperator setStep={setStep} />
            </div>
            <div className={`${step == 4 ? "block" : "hidden"}`}>
              <KeystoreForm
                setStep={setStep}
                setPayloadRegisterValidator={setPayloadRegisterValidator}
              />
            </div>
            <div className={`${step == 5 ? "block" : "hidden"}`}>
              <SSVRegisterValidator payloadData={payloadRegisterValidator} />
            </div>
          </div>
          <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">Pool Information</h1>
            <div className="block w-2/3 mt-2">
              <a
                className="underline"
                href={`https://app.frens.fun/pool/${poolAddress}`}
              >
                {`https://app.frens.fun/pool/${poolAddress}`}
              </a>
              <PoolInfo poolAddress={poolAddress} />
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
