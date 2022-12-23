import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAccount } from "wagmi"
import { useState, useEffect } from 'react';
import Navbar from 'components/shared/navbar';
import Footer from 'components/shared/footer';
import { StakeFormComponent } from 'components/staker/stakeFormComponent';
import { OperatorWidget } from 'components/staker/operatorWidget';
import { PoolInfo } from 'components/shared/poolInfo';
import { NftGallery } from 'components/staker/nftGallery';

const Pool: NextPage = () => {
  const router = useRouter()
  const poolAddress:string = router.query.pool ? router.query.pool as string : "0xc4cd3e20fFb01B8655ea78Dc73331ea0aCB4B514"

  const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  
  const { address } = useAccount()

  useEffect(() => {
    if (address) {
        setIsDefinitelyConnected(true);
    } else {
        setIsDefinitelyConnected(false);
    }
  }, [address]);

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-300 min-h-screen" data-theme="winter">
      <Head>
        <title>FRENS Pool</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>
      
      <Navbar />

      <main className="flex flex-col justify-center items-center min-h-[93vh]">
            
        <OperatorWidget poolAddress={poolAddress} />

        <div className='w-3/5 border-2 border-violet-500 rounded-md bg-white mt-6'>
          {/* <DepositProgressBarComponent /> */}

          <StakeFormComponent poolAddress={poolAddress} isDepositing={isDepositing} setIsDepositing={setIsDepositing} />

          <div className='border border-violet-500 rounded-md mx-4'></div>
          <PoolInfo address={poolAddress} />
        </div>

        <div className={`w-3/5 p-4 my-6 border-2 border-violet-500 rounded-md bg-white ${isDefinitelyConnected ? "block" : "hidden"}`}>
          <div className='text-center font-bold my-2'>Pool stakes</div>
          <NftGallery isDepositing={isDepositing}/>
        </div>

      </main>
      <Footer/>
    </div >
  );
};

export default Pool;
