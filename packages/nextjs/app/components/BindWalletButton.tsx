"use client";

import { useState } from "react";
import { useBindWallet } from "../hooks/useBindWallet";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAccount } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export function BindWalletButton() {
  const { address, isConnected } = useAccount();
  const { bind, isLoading, isFetching, success, error, keyRes } = useBindWallet();

  if (!isConnected || !address) return null;

  if (isFetching) {
    return <p className="text-yellow-300">Checking if your wallet is bound...</p>;
  }

  if (success && keyRes?.isBound) {
    return (
      <div>
        <p className="text-green-400 font-semibold">Wallet bound successfully ✅</p>
        <WalletAddress address={keyRes.flowEDUAddress} />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-red-400 text-sm">You have not bound your wallet.</p>

      <button
        onClick={bind}
        disabled={isLoading}
        className="bg-yellow-300 text-black px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? "Binding..." : success && keyRes?.isBound ? "Wallet Bound ✅" : "Bind Wallet"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export const WalletAddress = ({ address }: { address: string }) => {
  const [addressCopied, setAddressCopied] = useState(false);

  return (
    <div className="flex items-center" style={{ fontSize: "1.12em" }}>
      {address}
      {addressCopied ? (
        <CheckCircleIcon
          className="ml-1.5 text-xl font-normal text-base-content h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
      ) : (
        <CopyToClipboard
          text={address as string}
          onCopy={() => {
            setAddressCopied(true);
            setTimeout(() => {
              setAddressCopied(false);
            }, 1000);
          }}
        >
          <DocumentDuplicateIcon className="ml-1.5 text-xl font-normal h-5 w-5 cursor-pointer" aria-hidden="true" />
        </CopyToClipboard>
      )}
    </div>
  );
};
