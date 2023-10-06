import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Address, useAccount, useBalance } from "wagmi";
import { ValidatorWidget } from "#/components/staker/ValidatorWidget";
import Header from "components/shared/Header";
import Footer from "components/shared/Footer";
import { PoolInfo } from "components/shared/PoolInfo";
import { NftGallery } from "components/staker/NftGallery";
import { OperatorWidget } from "components/staker/OperatorWidget";
import { PoolFullWidget } from "components/staker/PoolFullWidget";
import { StakeForm } from "components/staker/StakeForm";
import { usePoolState } from "#/hooks/read/usePoolState";

const Pool: NextPage = ({}) => {
  const router = useRouter();
  const poolAddress = router.query.pool as Address | "0x";
  const { data: poolState } = usePoolState({ poolAddress });
  const { isConnected } = useAccount();

  const [poolBalance, setPoolBalance] = useState<number>(0);

  useBalance({
    address: poolAddress,
    watch: true,
    onSuccess(data) {
      if (setPoolBalance) setPoolBalance(+data.formatted);
    },
  });

  if (poolAddress) {
    return (
      <div
        className="bg-gradient-to-r from-cyan-50 to-blue-50 min-h-screen"
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

        <Header />

        {/* Content */}
        <main className="relative -mt-32 ">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg px-5 py-6 shadow sm:px-6">
              <div className="relative isolate overflow-hidden pt-0">
                <div className="pt-6 px-4 sm:px-6 sm:pb-6 lg:px-8 ">
                  {/* Describtion */}
                  <div className="pb-4 mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                    <h1 className="text-base font-semibold leading-7 text-gray-900">
                      Your friend wants to pool ETH with you
                    </h1>
                  </div>
                  {/* Pool Page */}
                  <div className="flex flex-col justify-center items-center min-h-[93vh]">
                    <div className="z-20 w-11/12 md:w-2/3 border-2 border-slate-400 rounded-md bg-white mt-6">
                      <OperatorWidget poolAddress={poolAddress} />
                    </div>

                    {poolState === "staked" && (
                      <ValidatorWidget poolAddress={poolAddress} />
                    )}

                    {poolBalance === 32 || poolState === "staked" ? (
                      <PoolFullWidget
                        poolAddress={poolAddress}
                        poolState={poolState}
                      />
                    ) : (
                      <div className="z-20 w-11/12 md:w-2/3 border-2 border-slate-400 rounded-md bg-white mt-6">
                        <StakeForm poolAddress={poolAddress} />
                        <div className="border border-slate-400 rounded-md mx-4"></div>
                        <PoolInfo poolBalance={poolBalance} />
                      </div>
                    )}

                    <div
                      className={`z-20 w-11/12 md:w-2/3 p-4 my-6 border-2 border-slate-400 rounded-md bg-white ${
                        isConnected ? "block" : "block"
                      }`}
                    >
                      <div className="text-center font-bold my-2">
                        Pool stakes
                      </div>
                      <NftGallery poolAddress={poolAddress} />
                    </div>
                  </div>
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

export default Pool;
