import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Address, useAccount } from "wagmi";
import { useState } from "react";
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import { StakeForm } from "components/staker/StakeForm";
import { OperatorWidget } from "components/staker/OperatorWidget";
import { PoolInfo } from "components/shared/PoolInfo";
import { NftGallery } from "components/staker/NftGallery";

const Pool: NextPage = () => {
  const router = useRouter();
  const poolAddress = router.query.pool as Address|undefined;

  const [isDepositing, setIsDepositing] = useState(false);
  const { isConnected } = useAccount();

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

        <Navbar />

        <main className="flex flex-col justify-center items-center min-h-[93vh]">
          <div className="z-20 w-11/12 md:w-2/3 border-2 border-slate-400 rounded-md bg-white mt-6">
            <OperatorWidget poolAddress={poolAddress} />
          </div>

          <div className="z-20 w-11/12 md:w-2/3 border-2 border-slate-400 rounded-md bg-white mt-6">
            <StakeForm
              poolAddress={poolAddress.toString()}
              isDepositing={isDepositing}
              setIsDepositing={setIsDepositing}
            />
            <div className="border border-slate-400 rounded-md mx-4"></div>
            <PoolInfo poolAddress={poolAddress.toString()} />
          </div>

          <div
            className={`z-20 w-11/12 md:w-2/3 p-4 my-6 border-2 border-slate-400 rounded-md bg-white ${
              isConnected ? "block" : "block"
            }`}
          >
            <div className="text-center font-bold my-2">Pool stakes</div>
            {isConnected ? (
              <NftGallery
                poolAddress={poolAddress.toString()}
                isDepositing={isDepositing}
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="">Connect wallet to see 🧐</div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return <div>loading animation!</div>;
};

export default Pool;
