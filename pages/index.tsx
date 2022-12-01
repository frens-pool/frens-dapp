import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from 'components/shared/navbar';
import Footer from 'components/shared/footer';
import { InviteFrens } from 'components/operator/inviteFrens';
import { CreatePool } from 'components/operator/createPool';
import { SelectOperator } from 'components/operator/selectOperator';
import { DropKeys } from 'components/operator/dropKeys';
import { GiveAllowance } from 'components/operator/giveAllowance';
import { PoolInfo } from 'components/shared/poolInfo';
import { Deposit } from 'components/operator/deposit';

const Operator: NextPage = () => {
  const poolAddress = useRouter().query["pool"];
  const [poolContract, setPoolContract] = useState("")
  const [tokenCode, setTokenCode] = useState("abcdef")
  const [step, setStep] = useState(1)
  const [depositFileData, setDepositFileData] = useState()

  useEffect(() => {
    if (poolAddress) {
      setPoolContract(poolAddress as string);
      setStep(4)
    }
  }, [poolAddress])

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-300" data-theme="winter">
      <Head>
        <title>FRENS Pool </title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>

      <Navbar />

      <main className="flex flex-col justify-center items-center min-h-[93vh]">
        <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">
            1️⃣ Create Pool
          </h1>
          <div className={`${step == 1 ? "block" : "hidden"}`}>
            <CreatePool setTokenCode={setTokenCode} setStep={setStep} setPoolContract={setPoolContract} />
          </div>
        </div>

        <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">
            2️⃣ Invite frens
          </h1>
          <div className={`${(step == 2 || step == 3) ? "block" : "hidden"}`}>
            <InviteFrens tokenCode={tokenCode} poolContract={poolContract} setStep={setStep} />
          </div>
        </div>

        {/* <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">
             Watch pool fill
          </h1>
          <div className={`${step == 3 ? "block w-2/3" : "hidden"}`}>
            <PoolInfo address={poolContract} />
          </div>
        </div> */}

        <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-violet-500 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">
            3️⃣ Run SSV-validator
          </h1>
          <div className={`${step == 3 ? "block" : "hidden"}`}>
            <div className='my-2 text-center'>
              Once your pool is full, you can run the SSV-validator to start the deposit process.
            </div>
            <div className="mt-4">
              <Link 
                href={`/run/${poolContract}`}
              >
                <a className='btn bg-gradient-to-r from-pink-500 to-violet-500 text-white'>
                  Run SSV-validator
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div >
  );
};

export default Operator;
