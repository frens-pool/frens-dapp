"use client"

import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <div className="hero min-h-screen -mt-12">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src="/frens.png"
            className="hidden md:block hover:rotate-[360deg] hover:duration-1000 basis-2/5 max-w-sm mr-0 md:mr-20 rounded-lg shadow-2xl"
            width={500}
            height={500}
            alt="Frens"
          />
          <div className="basis-3/5">
            <div className="flex">
              <h1 className="text-5xl font-bold text-white">
                Stake with Frens!
              </h1>
              <div className="ml-2 text-5xl animate-wiggle">🧑‍🤝‍🧑</div>
            </div>
            <p className="text-xl py-6 text-white">Frens is a peer-to-peer staking pool solution that allows staking on trusted node operators (friends).</p>
            {/* <Link href="/operator" className="btn btn-primary text-white bg-gradient-to-r from-pink-500 to-violet-500">
              Get Started
            </Link> */}
            <a href="https://frens.fun/operator" className="btn btn-primary text-white bg-gradient-to-r from-pink-500 to-violet-500">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};