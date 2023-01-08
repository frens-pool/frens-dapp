import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { ISharesKeyPairs, SSVKeys } from "ssv-keys";
import Head from "next/head";
import router, { useRouter } from "next/router";
import Navbar from "components/shared/navbar";
import Footer from "components/shared/footer";
import { SelectOperator } from "components/operator/selectOperator";
import { DropKeys } from "components/operator/dropKeys";
import { SSVRegisterValidator } from "components/operator/ssvRegisterValidator";
import { PoolInfo } from "components/shared/poolInfo";
import { Deposit } from "components/operator/deposit";

const Operator: NextPage = () => {
  const router = useRouter();
  const poolAddress = router.query.pool as string;

  const [step, setStep] = useState(4);
  const [pw, setPW] = useState("");
  const [payloadRegisterValidator, setPayloadRegisterValidator] = useState();
  const [depositFileData, setDepositFileData] = useState();
  const [keystoreFileData, setKeystoreFileData] = useState();

  function buildRegisterPayload() {
    const keyshareData = async () => {
      const response = await fetch("/api/keyshares", {
        method: "POST",
        body: JSON.stringify({ keystore: keystoreFileData, password: pw }),
      });
      if (response.status === 451) {
        setStep(4);
      }
      return response.json();
    };
    keyshareData().then((data) => {
      if (data.ssvData) {
        setPayloadRegisterValidator(data.ssvData);
      }
    });
  }

  // const response = await fetch("/api/keyshares", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     keystore: keystoreFileData,
  //     password: pw,
  //   }),
  // });

  function handleKeystoreDrop(data) {
    if (JSON.parse(data).crypto) {
      setKeystoreFileData(data);
    } else {
      alert("please upload a keystore file");
    }
  }

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
            <h1 className="text-3xl font-bold">Pool Information</h1>
            <div className="block w-2/3 mt-2">
              {/* <a
                className="underline"
                href={`https://app.frens.fun/pool/${poolAddress}`}
              >
                {`https://app.frens.fun/pool/${poolAddress}`}
              </a> */}
              {/* <PoolInfo poolAddress={poolAddress} /> */}
            </div>
          </div>

          <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
            <h1 className="text-3xl font-bold">Run SSV-validator</h1>
            <ul className="steps mt-2">
              <li className={`step px-1 ${step >= 1 ? "step-primary" : ""}`}>
                Create Keys
              </li>
              <li className={`step px-1 ${step >= 2 ? "step-primary" : ""}`}>
                Deposit ETH
              </li>
              <li className={`step px-1 ${step >= 3 ? "step-primary" : ""}`}>
                Select operators
              </li>
              <li className={`step px-1 ${step >= 4 ? "step-primary" : ""}`}>
                Upload keystore
              </li>
              <li className={`step px-1 ${step >= 5 ? "step-primary" : ""}`}>
                Register validator
              </li>
            </ul>
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
                  onFileReceived={(data) => {
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
              <div className="my-2 p-2 border border-slate-700 rounded-md">
                <div>upload the keystore file here</div>
                <DropKeys
                  onFileReceived={(data) => {
                    handleKeystoreDrop(data);
                  }}
                />
                <div>Keystore password:</div>
                <input
                  type="text"
                  onChange={(e) => setPW(e.target.value)}
                  className="input input-primary w-full max-w-xs my-2"
                />
                <button
                  className="btn bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                  onClick={() => {
                    buildRegisterPayload();
                    setStep(5);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
            <div className={`${step == 5 ? "block" : "hidden"}`}>
              <div className="my-2 p-2 border border-slate-700 rounded-md">
                <div>register validator</div>
                <SSVRegisterValidator payloadData={payloadRegisterValidator} />
              </div>
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
