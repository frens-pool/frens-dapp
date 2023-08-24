import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import { PoolList } from "components/dashboard/PoolList";
import { ShareList } from "components/dashboard/ShareList";
import { ActionButtons } from "#/components/dashboard/ActionButtons";

const Dashboard: NextPage = () => {
  return (
    <div
      className="bg-gradient-to-r from-cyan-50 to-blue-50"
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
        <div className="z-20 w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h1 className="text-2xl font-bold">My Pools</h1>
          <PoolList />
          <h1 className="text-2xl font-bold">My Shares</h1>
          <ShareList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
