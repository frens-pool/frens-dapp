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

  const [depositFileData, setDepositFileData] = useState();
  const [keystoreFileData, setKeystoreFileData] = useState();

  function handleKeystoreDrop(data) {
    const keystoreJSON = JSON.parse(data);

    const keyshareData = async () => {
      const response = await fetch("/api/keyshares", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    keyshareData().then((data) => {
      alert(data.privateKey);
    });
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
            <h1 className="text-3xl font-bold">3️⃣ Run SSV-validator</h1>
            <div className="block">
              <div>
                <div className="my-2 p-2 border border-slate-700 rounded-md">
                  <div>1. create staking keys</div>
                  <div>using this command:</div>
                  <div>
                    <code>
                      deposit new-mnemonic --eth1_withdrawal_address{" "}
                      {poolAddress}
                    </code>
                  </div>
                  <div>or using wagyu key gen</div>
                </div>
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
                </div>
                <div className="my-2 p-2 border border-slate-700 rounded-md">
                  <div>3. register SSV validator</div>
                  <div>upload the keystore file here</div>
                  <DropKeys
                    onFileReceived={(data) => {
                      handleKeystoreDrop(data);
                    }}
                  />
                  <div>select ur operators</div>
                  {/* <SelectOperator setTokenCode={setTokenCode}/> */}
                  <div>register validator</div>
                  <SSVRegisterValidator keystoredata={keystoreFileData} />
                </div>
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
