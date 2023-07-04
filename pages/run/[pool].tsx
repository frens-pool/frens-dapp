import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import { SelectOperator } from "components/operator/SelectOperator";
import { SSVRegisterValidator } from "components/operator/SsvRegisterValidator";
import { KeystoreForm } from "components/operator/KeystoreForm";
import { CreateKeys } from "components/operator/CreateKeys";
import { DepositForm } from "components/operator/DepositForm";
import { SetPubkey } from "#/components/operator/SetPubkey";
import { Address } from "wagmi";

const Operator: NextPage = () => {
  const router = useRouter();
  const poolAddress = router.query.pool as Address;

  enum STEP {
    CREATE_KEYS = 0,
    DEPOSIT_FILE,
    DEPOSIT,
    SELECT_OPERATOR,
    KEYSTORE_FORM,
    SSV_REGISTER,
  }

  const [step, setStep] = useState(STEP.CREATE_KEYS);
  const [operators, setOperators] = useState();
  const [payloadRegisterValidator, setPayloadRegisterValidator] = useState();

  const number = (step: STEP) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"][step];
  const className = (current_step: STEP, step: STEP) =>
    `${current_step == step ? "block" : "hidden"}`;

  if (poolAddress) {
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
            <h1 className="text-3xl font-bold">
              {number(STEP.CREATE_KEYS)} create keys
            </h1>
            <div className={className(step, STEP.CREATE_KEYS)}>
              <CreateKeys
                nextStep={() => setStep(STEP.DEPOSIT_FILE)}
                poolAddress={poolAddress}
              />
            </div>
          </div>
          <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">
              {number(STEP.DEPOSIT_FILE)} upload deposit file
            </h1>
            <div className={className(step, STEP.DEPOSIT_FILE)}>
              <SetPubkey
                poolAddress={poolAddress}
                onFinish={() => setStep(STEP.DEPOSIT)}
                nextStep={() => setStep(STEP.DEPOSIT)}
              />
            </div>
          </div>
          <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">
              {number(STEP.DEPOSIT)} deposit ETH
            </h1>
            <div className={className(step, STEP.DEPOSIT)}>
              <DepositForm
                nextStep={() => setStep(STEP.SELECT_OPERATOR)}
                poolAddress={poolAddress}
              />
            </div>
          </div>
          <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">
              {number(STEP.SELECT_OPERATOR)} select four operators
            </h1>
            <div className={className(step, STEP.SELECT_OPERATOR)}>
              <SelectOperator
                nextStep={() => setStep(STEP.KEYSTORE_FORM)}
                setOperators={setOperators}
              />
            </div>
          </div>
          <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">
              {number(STEP.KEYSTORE_FORM)} upload keystore
            </h1>
            <div className={className(step, STEP.KEYSTORE_FORM)}>
              <KeystoreForm
                nextStep={() => setStep(STEP.SSV_REGISTER)}
                operators={operators}
                setPayloadRegisterValidator={setPayloadRegisterValidator}
              />
            </div>
          </div>
          <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">
              {number(STEP.SSV_REGISTER)} register validator
            </h1>
            <div className={className(step, STEP.SSV_REGISTER)}>
              <SSVRegisterValidator payloadData={payloadRegisterValidator} />
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
