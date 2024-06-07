"use client";

import type { NextPage } from "next";

import Header from "components/shared/Header";
import { PoolList } from "components/shared/PoolList";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      {/* Content */}
      <main className="w-full pb-20 lg:pb-40">
            {/* Heading */}
            <div className="w-full flex flex-col items-start justify-start">
              <div className="w-full px-[8vw] pt-20 pb-12 bg-gradient-to-r from-[#3211C8] from-0% to-[#437CEA] to-100%">
                <h1 className="text-white font-extrabold text-[30px]">
                  All pools
                </h1>
              </div>
              <div className="w-full flex flex-col xl:flex-row items-start justify-start px-[8vw] xl:pl-[8vw] xl:pr-24 z-[9] -mt-6">
                <div className="w-full xl:flex-1">
                  <PoolList />
                </div>
                <div className="hidden relative xl:flex flex-col items-center justify-center ml-16 -mt-[66px] w-[390px] h-[568px]">
                    <div className="z-[20] absolute flex-col items-center justify-center">
                      <h1 className="text-frens-blue font-extrabold text-[30px] mt-8 text-center">Hi fren!</h1>
                      <h1 className="text-frens-blue font-bold text-[16px] text-center">Can't wait to jump in?</h1>
                      <h1 className="text-[30px] text-center">🏊🏊🏊</h1>
                      <Link href="/create"><button className="btn-inbetween text-white blue-to-purple mt-4">start new pool</button></Link>
                    </div>
                    <img
                        className="h-[568px] opacity-10 absolute top-0 left-0 z-[0]"
                        src="/FRENS-logo-coloured.png"
                    />
                </div>
              </div>
            </div>
      </main>
    </div>
  );
};

export default Home;
