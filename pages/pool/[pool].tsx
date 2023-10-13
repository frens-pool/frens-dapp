import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Address, useBalance } from "wagmi";
import { ValidatorWidget } from "#/components/staker/ValidatorWidget";
import Header from "components/shared/Header";
import Footer from "components/shared/Footer";
import { PoolInfo } from "components/shared/PoolInfo";
import { NftGallery } from "components/staker/NftGallery";
import { OperatorWidget } from "components/staker/OperatorWidget";
import { PoolFullWidget } from "components/staker/PoolFullWidget";
import { StakeForm } from "components/staker/StakeForm";
import { usePoolState } from "#/hooks/read/usePoolState";
import { usePoolOwner } from "#/hooks/read/usePoolOwner";

const Pool: NextPage = ({}) => {
  const router = useRouter();
  const poolAddress = router.query.pool as Address | "0x";
  const { data: poolState } = usePoolState({ poolAddress });

  const [poolBalance, setPoolBalance] = useState<number>(0);

  useBalance({
    address: poolAddress,
    watch: true,
    onSuccess(data) {
      if (setPoolBalance) setPoolBalance(+data.formatted);
    },
  });

  const [operatorAddress, setOperatorAddress] = useState<Address>("0x49792f9cd0a7DC957CA6658B18a3c2A6d8F36F2d"); //default
  const { data: poolOwner, isSuccess } = usePoolOwner({ address: poolAddress });
  useEffect(() => {
    if (isSuccess) {
      if (poolOwner) {
        setOperatorAddress(poolOwner);
      }
    }
  }, [isSuccess, poolOwner]);

  if (poolAddress) {
    return (
      <div className="" data-theme="winter">
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
                  {/* Pool Page */}
                  <div className="grid grid-cols-1 gap-y-8">
                    <OperatorWidget poolAddress={poolAddress} />
                    {poolState === "staked" && (
                      <ValidatorWidget poolAddress={poolAddress} />
                    )}
                    {poolBalance === 32 || poolState === "staked" ? (
                      <PoolFullWidget
                        poolAddress={poolAddress}
                        poolState={poolState}
                      />
                    ) : (
                      <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                        <div className="pt-4 pb-2">
                          <StakeForm poolAddress={poolAddress} />
                          <div className="border-[0.5px] border-gray-200 rounded-md mx-4"></div>
                          <PoolInfo poolBalance={poolBalance} />
                        </div>
                      </div>
                    )}
                    <div className="text-center overflow-hidden rounded-xl border border-gray-200">
                      <div className="pt-2 text-center font-bold my-2">
                        Pool stakes
                      </div>
                      <div className="p-4">
                        <NftGallery poolAddress={poolAddress} />
                      </div>
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
