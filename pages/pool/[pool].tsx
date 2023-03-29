import { ValidatorWidget } from "#/components/staker/ValidatorWidget";
import { CacheService } from "#/utils/cache/cacheService";
import Footer from "components/shared/Footer";
import Navbar from "components/shared/Navbar";
import { PoolInfo } from "components/shared/PoolInfo";
import { NftGallery } from "components/staker/NftGallery";
import { OperatorWidget } from "components/staker/OperatorWidget";
import { StakeForm } from "components/staker/StakeForm";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Address, useAccount } from "wagmi";

interface Props {
  shareIds: string[];
}

const Pool: NextPage<Props> = ({ shareIds }) => {
  const router = useRouter();
  const poolAddress = router.query.pool as Address | undefined;

  const [isDepositing, setIsDepositing] = useState<boolean>(false);

  const shareId = router.query.shareId;
  if (shareId !== undefined) {
    router.replace({ query: { pool: poolAddress } });
    router.reload();
  }

  const [_, setShareIdInfo] = useState([]);
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

          <ValidatorWidget poolAddress={poolAddress} />

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
            <NftGallery
              poolAddress={poolAddress}
              isDepositing={isDepositing}
              shareIds={shareIds}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return <div>loading animation!</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const poolAddress = context.query.pool;
  const shareId = context.query.shareId;
  if (shareId !== undefined) {
    await CacheService.saveShareId(poolAddress as string, [shareId as string]);
    return { props: {} };
  }

  const shareIds = await CacheService.getShareIds(poolAddress as string);
  return { props: { shareIds: shareIds } };
};

export default Pool;
