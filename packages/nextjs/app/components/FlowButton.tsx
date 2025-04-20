"use client";

import { BindWalletButton } from "./BindWalletButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function FlowButton() {
  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal, mounted }) => {
        const connected = mounted && account;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <div className="space-y-2">
                    <p className="text-sm text-white/70">Connect your wallet to get started.</p>

                    <button
                      className="px-20 py-2 text-sm font-medium text-black bg-yellow-300 rounded-md hover:bg-yellow-400 transition"
                      onClick={openConnectModal}
                      type="button"
                    >
                      Connect Wallet
                    </button>
                  </div>
                );
              }

              return <BindWalletButton />;
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
