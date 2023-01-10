import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import router, { useRouter } from "next/router";
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import { SelectOperator } from "components/operator/SelectOperator";
import { DropKeys } from "components/operator/DropKeys";
import { SSVRegisterValidator } from "components/operator/SsvRegisterValidator";
import { PoolInfo } from "components/shared/PoolInfo";
import { Deposit } from "components/operator/Deposit";
import { KeystoreForm } from "components/operator/KeystoreForm";
import { StepIndicator } from "components/operator/StepIndicator";

const Operator: NextPage = () => {
  const router = useRouter();
  const poolAddress = router.query.pool as string;

  const [step, setStep] = useState(4);
  const [payloadRegisterValidator, setPayloadRegisterValidator] = useState();
  const [depositFileData, setDepositFileData] = useState();

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
              <div className="my-2 p-2 border border-slate-700 rounded-md">
                <div>1. create staking keys</div>
                <div>using this command:</div>
                <div>
                  <code>
                    deposit new-mnemonic --eth1_withdrawal_address {poolAddress}
                  </code>
                </div>
                <div>or using wagyu key gen</div>
                <button
                  className="btn bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
            <div className={`${step == 2 ? "block" : "hidden"}`}>
              <div className="my-2 p-2 border border-slate-700 rounded-md">
                <div>2. Deposit ETH</div>
                <div>upload the deposit file here</div>
                <DropKeys
                  onFileReceived={(data: any) => {
                    const depositData = JSON.parse(data);
                    setDepositFileData(depositData[0]);
                  }}
                />
                <Deposit
                  address={poolAddress as string}
                  depositdata={depositFileData}
                />
                <button
                  className="btn bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                  onClick={() => {
                    setStep(3);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
            <div className={`${step == 3 ? "block" : "hidden"}`}>
              <div className="my-2 p-2 border border-slate-700 rounded-md">
                <div>select ur operators</div>
                {/* <SelectOperator setTokenCode={setTokenCode} /> */}
                <button
                  className="btn bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                  onClick={() => {
                    setStep(4);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
            <div className={`${step == 4 ? "block" : "hidden"}`}>
              <KeystoreForm
                setStep={setStep}
                setPayloadRegisterValidator={setPayloadRegisterValidator}
              />
            </div>
            <div className={`${step == 5 ? "block" : "hidden"}`}>
              <div className="my-2 p-2 border border-slate-700 rounded-md">
                <div>register validator</div>
                <SSVRegisterValidator payloadData={payloadRegisterValidator} />
              </div>
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
