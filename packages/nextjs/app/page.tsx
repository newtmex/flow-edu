"use client";

import { BindWalletButton } from "./components/BindWalletButton";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address } = useAccount();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center space-y-6">
      <section>
        <h1 className="text-4xl font-bold mb-2">FlowEDU</h1>
        <p className="text-lg text-white-600 max-w-xl">
          Seamless token bridging for the EDU ecosystem. Bind your wallet to start moving assets effortlessly across
          chains.
        </p>
      </section>

      {address ? (
        <BindWalletButton />
      ) : (
        <div className="space-y-2">
          <p className="text-500 text-sm">Connect your wallet to get started.</p>
          <RainbowKitCustomConnectButton />
        </div>
      )}
    </main>
  );
};

export default Home;
